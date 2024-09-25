import React from 'react'

const Toast = (props) => {
    return (
        <div>
            {props.visible && (
                <div className={`toast align-items-center text-bg-${props.visible.type} float-end border-0 show`} role="alert" aria-live="assertive" aria-atomic="true" style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: "10" }}>
                    <div className="d-flex">
                        <div className="toast-body">
                            {props.visible.msg}
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Toast;
