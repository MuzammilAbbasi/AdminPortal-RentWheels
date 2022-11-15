import React from "react";
import { Card} from "reactstrap";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";

const NoDataListHeading = () => {
    return (
        <Colxx xxs="12" className="mb-3">
            <ContextMenuTrigger id="menu_id">
                <Card className="d-flex flex-row">
                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                            <p className="list-item-heading mb-1 truncate w-100 w-sm-100">
                                No data to show
                            </p>                            
                        </div>
                    </div>
                </Card>
            </ContextMenuTrigger>
        </Colxx >
    );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(NoDataListHeading);
