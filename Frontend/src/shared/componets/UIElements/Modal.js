import React, {useRef, useEffect} from 'react'
import './Modal.css'
import ReactDOM from 'react-dom';
import {CSSTransition} from 'react-transition-group'
import BackDrop from './BackDrop'

const ModalOverlay = props => {
    const modalRef = useRef();
    const content = (
        <div className={`modal ${props.className}`} style={props.style} ref={modalRef}>
            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            <form onSubmit={
                props.onSubmit ? props.onSubmit : event => event.preventDefault()
            }>
                <div className={`modal__content ${props.contentClass}`}>
                    {props.children}
                </div>
                <footer className={`modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

function Modal(props) {
    const modalRef = useRef();

    useEffect(() => {
        if(props.show) {
            modalRef.current.focus();
        }
    }, [props.show]);

  return (
    <React.Fragment>
        {props.show && <BackDrop onClick={props.onCancel}/>}
        <CSSTransition 
        in={props.show} 
        mountOnEnter
        unmountOnExit 
        timeout={200} 
        classNames='modal'
        nodeRef={props.modalRef}
        >
            <div tabIndex="-1" ref={modalRef}>
          <ModalOverlay {...props} />
        </div>
        </CSSTransition>
    
    </React.Fragment>
  )
}

export default Modal;