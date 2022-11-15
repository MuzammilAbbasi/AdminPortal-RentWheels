import React from "react";
import { Card} from "reactstrap";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../../components/common/CustomBootstrap";

const InstitutionDataListHeading = () => {
    return (
        <Colxx xxs="12" className="mb-2">
            <ContextMenuTrigger id="menu_id">
                <Card className="d-flex flex-row">
                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                            <p className="list-item-heading mb-1 w-15 w-sm-100">
                                Code
                            </p>
                            <p className="list-item-heading mb-1 w-30 w-sm-100">
                                Description
                            </p>
                            <p className="list-item-heading w-20 w-sm-100">
                                Status
                            </p>
                            <p className="list-item-heading mb-1 w-25 w-sm-100">
                                Datetime
                                <br />
                                <span className="mb-1 text-muted w-100 w-sm-100">
                                    (dd-MM-yyyy hh:mm:ss a)
                                </span>
                            </p>
                        </div>
                        <p className="align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center mb-1 list-item-heading truncate w-10 w-sm-100">
                            Actions
                            </p>
                    </div>
                </Card>
            </ContextMenuTrigger>
        </Colxx >
    );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(InstitutionDataListHeading);
