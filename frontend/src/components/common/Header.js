import React from 'react'
import { ArrowLeft } from 'react-bootstrap-icons'
import { withRouter, useHistory } from 'react-router-dom'

export const Header = (props) => {

    let back = { backgroundImage: "url(" + props.image + ")" }

    const history = useHistory()

    return (
        props.image ? (
            <div id='header_image' className='header' style={back}>
                <div className='content'>
                    <button onClick={() => history.goBack()}>
                        <ArrowLeft />
                    </button>
                    <h3>{props.title}</h3>
                </div>
            </div>
        ) : (
            <div className='header'>
                {props.title !== 'EatLivery' ? (
                    <button onClick={() => history.goBack()}>
                        <ArrowLeft />
                    </button>
                ) : null}
                <h3>{props.title}</h3>
            </div>
        )
    )
}

export default withRouter(Header)
