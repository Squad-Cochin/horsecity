////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                       Accounts page functionality done over here.                          //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  ModalHeader,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { withTranslation } from "react-i18next";

/**IMPORTED FILES */
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  getAccountsData,
  getSingleAccountsData,
} from "../../helpers/ApiRoutes/getApiRoutes";
import withRouter from "../../components/Common/withRouter";
import config from "../../config";

const Accounts = (props) => {
  const [accounts, setAccounts] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const [view_modal, setView_modal] =
    useState(false); /**Using for showing VIEW modal */
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfData, setNumberOfData] = useState(0);
  const [module, setModule] = useState({});
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [pageTitle, setPageTitle] = useState("KailPlus");
  const [searchInp, setSearchInp] = useState("");
  const pageLimit = config.pageLimit;
  const role_id = config.Role;

  /**THIS HOOK WILL RENDER INITIAL TIME */
  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("settingsData"));
    setPageTitle(settings.application_title);
    const data = JSON.parse(localStorage.getItem("authUser"));
    let userIdd = data[0]?.user[0]?.id;
    let role_id = data[0]?.user[0]?.role_Id;
    setRole(role_id);
    setUserId(userIdd);
    getAllData(1);
  }, [userId, role]);

  /**Getting accounts page data */
  async function getAllData(page) {
    if (userId) {
      let getAccountsdata = await getAccountsData(page || 1, userId);
      setAccounts(getAccountsdata?.accounts);
      setModule(getAccountsdata?.module[0]);
      setPageNumber(page);
      setNumberOfData(getAccountsdata?.totalCount);
    }
  }

  /**GET SINGLE ACCOUNTS */
  async function tog_view(productId) {
    let singleAccount = await getSingleAccountsData(productId);
    setSingleData(singleAccount?.accounts);
    setView_modal(!view_modal);
  }
  /**Filter data */
  const filteredAccounts = accounts?.filter(
    (value) =>
      value?.quotation_id
        .toString()
        .toLowerCase()
        .includes(searchInp.toLowerCase().trim()) ||
      value?.customer_name.toLowerCase().includes(searchInp.toLowerCase().trim()) ||
      value?.service_provider_name.toLowerCase().includes(searchInp.toLowerCase().trim()) ||
      value?.status.toLowerCase().includes(searchInp.toLowerCase().trim())
  );
  
  const { dir } = useSelector(state => ({
    dir: state.Layout.dir,
  }));
  document.title = `${props.t("Accounts")} | ${pageTitle} `;
  return (
    <React.Fragment>
     <div className={`page-content ${dir === 'rtl' ? 'page-content-rtl' : ''}`}>
        <Container fluid>
          <Breadcrumbs title={props.t("Tables")} breadcrumbItem={props.t("Accounts")} />
          <Row>
          <br/> 
                  
            <Col lg={12}>
              <Card>
              <CardHeader>
                <div className="row align-items-md-center">
                  <h4 className="card-title mb-0 col-md-8  p-3"> <br/>  <span className="d-block mt-2 fs-16 text-success">{props.t("Total")} {numberOfData}</span></h4>
                  <form className="col-md-4">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search ..."
                          onChange={(e)=>setSearchInp(e.target.value)}
                          aria-label="Recipient's username"
                        />
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="button">
                            <i className="ri-search-line" />
                          </button>
                        </div>
                      </div>
                    </div>
                    </form>
                </div>  
                </CardHeader>
                <CardBody>
                  <div id="customerList">
                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="customerTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th className="index" data-sort="index">
                              #
                            </th>
                            <th className="sort" data-sort="month">
                            {props.t("Customer Name")}
                            </th>
                            {!(role === role_id.service_provider) ? (
                              <th className="sort" data-sort="month">
                                {props.t("Service Provider Name")}
                              </th>
                            ) : null}
                            <th className="sort" data-sort="number">
                            {props.t("Quotation Id")}
                            </th>
                            <th className="sort" data-sort="number">
                            {props.t("Total Payment")}
                            </th>
                            <th className="sort" data-sort="number">
                            {props.t("Pending Payment")}
                            </th>
                            <th className="sort" data-sort="number">
                            {props.t("Status")}
                            </th>
                            <th className="sort" data-sort="number">
                            {props.t("Payment Details")}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {filteredAccounts?.map((item, index) => (
                            <tr key={index}>
                              <th scope="row">
                                {index + 1 + (pageNumber - 1) * pageLimit}
                              </th>
                              <td className="customer_name">
                                {item.customer_name}
                              </td>
                              {!(role === role_id.service_provider) ? (
                                <td className="service_provider_name">
                                  {item.service_provider_name}
                                </td>
                              ) : null}
                              <td className="phone">{item.quotation_id}</td>
                              <td className="date">{item.total_amount}</td>
                              <td className="date">{item.pending_amount}</td>
                              <td className="phone">{item.status}</td>
                              <td>
                                {JSON.parse(module?.read || "true") ? (
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-success edit-item-btn"
                                      onClick={() =>
                                        tog_view(item.quotation_id)
                                      }
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                    >
                                      {props.t("View")}
                                    </button>
                                  </div>
                                ) : null}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        {pageNumber > 1 ? (
                          <Link
                            className="page-item pagination-prev disabled"
                            onClick={() => getAllData(pageNumber - 1)}
                          >
                            {props.t("Previous")}
                          </Link>
                        ) : null}
                        <ul className="pagination listjs-pagination mb-0"><b>{pageNumber!== 1 ? pageNumber : null}</b></ul>
                        {numberOfData > pageLimit * pageNumber ? (
                          <Link
                            className="page-item pagination-next"
                            onClick={() => getAllData(pageNumber + 1)}
                          >
                            {props.t("Next")}
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/****************************  View Modal*************** */}
      <Modal
        className="extra-width"
        isOpen={view_modal}
        toggle={() => {
          tog_view("view");
        }}
        centered
      >
        <ModalHeader
          className={`bg-light p-3 ${dir === 'rtl' ? 'exampleModalLabel-rtl' : ''}`}
          id="exampleModalLabel"
          toggle={() => {
            tog_view("view");
            setView_modal(false);
          }}
        >
          {props.t("Payment Details")}
        </ModalHeader>
        <form className="tablelist-form">
          <ModalBody>
            <div className="table-responsive table-card mt-3 mb-1">
              <table
                className="table align-middle table-nowrap"
                id="paymentTable"
              >
                <thead className="table-light">
                  <tr>
                    <th className="index" data-sort="index">
                      #
                    </th>
                    <th className="sort" data-sort="month">
                    {props.t("Received Payment")}
                    </th>
                    <th className="sort" data-sort="month">
                      {props.t("Received Date")}
                    </th>
                    <th className="sort" data-sort="number">
                      {props.t("Pending Payment")}
                    </th>
                  </tr>
                </thead>
                <tbody className="list form-check-all">
                  {singleData.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td className="recived_amount">{item.received_amount}</td>
                      <td className="recived_date">{item.received_date}</td>
                      <td className="pending_amount">{item.pending_amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setView_modal(false);
                  setSingleData([]);
                }}
              >
                {props.t("Close")}
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default withRouter(withTranslation()(Accounts));
