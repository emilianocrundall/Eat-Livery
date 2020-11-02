import React from 'react'
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const ModalUser = ({...props}) => {
    return (
        <div>
            <Modal
                show={props.show}
                onHide={props.onHide}
                dialogClassName='custom_modal'
                backdrop="static"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        className='text-center text-light'
                    >
                        User account
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='btn_cont'>
                        <Link id='first' className='full_btn' to='/register'>
                            Register
                        </Link>
                        <Link id='last' className='full_btn' to='/login'>
                            Login
                        </Link>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn_alt' onClick={props.onHide} >
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ModalUser)