import React from 'react'

const ModalChoiceListWord = ({handleClick, to, id, title}) => {

  return (
    <div className="modal fade" id={id} tabindex="-1" aria-labelledby={id} aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title text-third text-center" id="exampleModalLabel">Choose what you will be questioned about ?</h5>
                <button type="button" className={"btn-close"} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <h3 className="text-center mb-3">{title}</h3>
                <div className="tab-modal">
                    <div className="d-flex">
                        <div className="col-6 text-center">
                        <button onClick={() => handleClick(to )}  className="btn btn-primary">Random word</button>

                        </div>
                        <div className="col-6 text-center">
                        <button  onClick={() => handleClick(to + "?lowsuccess=true")} className="btn btn-primary">Most difficult word</button>

                        </div>
                    </div>
                </div>

            </div>
            <div className="modal-footer text-center">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
  )
}

export default ModalChoiceListWord