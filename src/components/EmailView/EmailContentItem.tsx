import { ArrowBendUpLeft, DotsThree, Star, Trash } from '@phosphor-icons/react';
import { useRef, useState } from 'react';
import { RootDispatch } from '../../store/rootStore.ts';
import { useDispatch } from 'react-redux';
import { deleteEmail, makeRead, toggleMark } from '../../store/EmailReducer.ts';
import { openPopup } from '../../store/MenuReducer.ts';

type propsType = {
  index: number;
  srcValue: string;
  type: 'open' | 'close';
  changeType: () => void;
  viewType: 'iframe' | 'string'
  from: string;
  to: string;
  time: string;
  title: string;
  emailId: string;
  isRead: boolean;
  setIsRead: () => void;
  toggleMark: () => void;
  isMarked: boolean;
}

const EmailContentItem = (props: propsType) => {
  const dispatch: RootDispatch = useDispatch();

  const iconSize = 16;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState<string>('0px');

  const handleIframeLoad = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const iframeDocument = iframeRef.current.contentWindow.document;
      const contentHeight = iframeDocument.body.scrollHeight;
      setIframeHeight(`${(contentHeight | 0) / 10}rem`);
      // document.getElementById(`email-content--item-${props.index}`)
      //   ?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (<div className="email-content--item" id={`email-content--item-${props.index}`}>
      {!props.isRead && <span className="email-content--item-dot" />}
      <div className="dateBar">
        Friday
      </div>
      <div
        className={`email-content--iframe-wrapper ${props.type === 'close' && props.from === 'You' && 'email-content--iframe-wrapper--soffocate'}`}
        onClick={() => {
          props.changeType();
          props.setIsRead();
          dispatch(makeRead(props.emailId));
        }}
      >
        <div className="email-content--info">
          <p className="email-content--info-from">{`${props.from} To ${props.to}`}</p>
          <p className="email-content--info-time">{props.time}</p>

          <div className="email-content--info-icons">
            <ArrowBendUpLeft size={iconSize} onClick={e => {
              e.stopPropagation();
              const replyBar: HTMLInputElement | null = document.querySelector('.email-replyBar--left-input');
              replyBar?.focus();
            }} />
            <Trash size={iconSize} onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteEmail(props.emailId));
            }} />
            <Star size={iconSize} onClick={(e) => {
              e.stopPropagation();
              props.toggleMark();
              dispatch(toggleMark(props.emailId));
            }} weight={props.isMarked ? 'fill' : undefined} />
            <DotsThree size={iconSize} onClick={(e) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              const coordinates = e.target?.getBoundingClientRect();
              dispatch(openPopup({ left: coordinates.left, top: coordinates.top }));
            }} />
          </div>
        </div>
        <div className="email-content--title">{props.title}</div>
        {props.viewType === 'iframe' && props.type === 'open' && <div className="email-content--open-mail">
          <iframe
            ref={iframeRef}
            srcDoc={props.srcValue}
            onLoad={handleIframeLoad}
            style={{ width: '100%', height: iframeHeight, border: 'none' }}
            title="Email Preview"
          />
        </div>}
        {props.viewType === 'string' && props.type === 'open' && <div className="email-content--open-mail">
          <p className="email-content--open-mail--paragraph">{props.srcValue}</p>
        </div>}
        {props.type === 'close' && <p className="email-content--closed-mail">
          {props.srcValue.substring(0, 500) + '...'}
        </p>}
      </div>
    </div>

  );
};

export default EmailContentItem;
