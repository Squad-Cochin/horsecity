////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                       Language page functionality done over here.                          //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { withTranslation } from "react-i18next";

/**IMPORTED FILES */
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { updateReviewStatus } from "../../helpers/ApiRoutes/editApiRoutes";
import { getReviewsData } from "../../helpers/ApiRoutes/getApiRoutes";
import withRouter from "../../components/Common/withRouter";
import config from "../../config";

const LanguageDeatails = (props) => {
  const [reviews, setReviews] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfData, setNumberOfData] = useState(0);
  const [pageTitle, setPageTitle] = useState("KailPlus");
  const [searchInp, setSearchInp] = useState("");
  const [userId, setUserId] = useState("");
  /**PAGE LIMIT */
  const pageLimit = config.pageLimit;
  const navigate = useNavigate();
  // THIS HOOK RENDERING INITIAL TIME TAKING FOR ALL RIVIEWS DATA
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("authUser"));
    const settings = JSON.parse(localStorage.getItem("settingsData"));
    let Userid = data[0]?.user[0]?.id;
    setPageTitle(settings.application_title);
    setUserId(Userid);
    getAllData(1);
  }, [userId]);

  /**FOR CHANGING REVIEW STATUS */
  async function toggleStatus(button, Id) {
    var currentStatus = button.innerText.trim();
    const review = reviews.find((e) => e.id === Id);
    let updateStatus = await updateReviewStatus(Id);
    if (updateStatus.code === 200) {
      if (currentStatus === "ACTIVE") {
        button.innerText = "INACTIVE";
        button.classList.remove("btn-success");
        button.classList.add("btn-danger");
        if (review) {
          review.status = "INACTIVE";
        }
      } else if (currentStatus === "INACTIVE") {
        button.innerText = "ACTIVE";
        button.classList.remove("btn-danger");
        button.classList.add("btn-success");
        if (review) {
          review.status = "ACTIVE";
        }
      }
    } else {
      navigate(`/pages-500`);
    }
  }

  // GET LANGUAGE DATA
  async function getAllData(page) {
    if (userId) {
      let getReviews = await getReviewsData(page || 1, userId);
      if (getReviews.code === 200) {
        setReviews(getReviews?.data?.reviews);
        setPageNumber(page);
        setNumberOfData(getReviews?.data?.totalCount);
      } else {
        navigate(`/pages-500`);
      }
    }
  }
  /**Filtered data */
  const filteredReviews = reviews?.filter(
    (value) =>
      value?.rating
        .toString()
        .toLowerCase()
        .includes(searchInp.toLowerCase().trim()) ||
      value?.customer_name
        .toLowerCase()
        .includes(searchInp.toLowerCase().trim()) ||
      value?.customer_email
        .toLowerCase()
        .includes(searchInp.toLowerCase().trim()) ||
      value?.vehicle_no.toLowerCase().includes(searchInp.toLowerCase().trim())
  );
  const { dir } = useSelector(state => ({
    dir: state.Layout.dir,
  }));

  document.title = `${props.t("Reviews")} | ${pageTitle} `;
  return (
    <React.Fragment>
       <div className={`page-content ${dir === 'rtl' ? 'page-content-rtl' : ''}`}>
        <Container fluid>
          <Breadcrumbs title={props.t("Tables")} breadcrumbItem={props.t("Reviews")} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <div className="row align-items-md-center">
                    <h4 className="card-title mb-0 col-md-8  p-3">
                      <br />{" "}
                      <span className="d-block mt-2 fs-16 text-success">
                      {props.t("Total")} {numberOfData}
                      </span>
                    </h4>
                    <form className="col-md-4">
                      <div className="form-group m-0">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={props.t("Search") + "..."}
                            onChange={(e) => setSearchInp(e.target.value)}
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
                  <div id="List">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto">
                        <div className="d-flex gap-1"></div>
                      </Col>
                    </Row>
                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="Table"
                      >
                        <thead className="table-light">
                          <tr>
                            <th className="index" data-sort="index">
                              #
                            </th>
                            <th className="sort" data-sort="name">
                            {props.t("Customer Name")}
                            </th>
                            <th className="sort" data-sort="abbreviation">
                            {props.t("Customer Email")}
                            </th>
                            <th className="sort" data-sort="created_at">
                            {props.t("Vehicle Number")}
                            </th>
                            <th className="sort" data-sort="created_at">
                            {props.t("Rating")}
                            </th>
                            <th className="sort" data-sort="created_at">
                            {props.t("Reviews")}
                            </th>
                            <th className="sort" data-sort="status">
                            {props.t("Status")}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {filteredReviews?.map((item, index) => (
                            <tr key={item.id}>
                              <th scope="row">
                                {index + 1 + (pageNumber - 1) * pageLimit}
                              </th>
                              <td className="name">{item.customer_name}</td>
                              <td className="email">{item.customer_email}</td>
                              <td className="vehicle_no">{item.vehicle_no}</td>
                              <td className="rating">{item.rating}</td>
                              <td className="review">{item.review}</td>
                              <td>
                                {item.status === "ACTIVE" ? (
                                  <button
                                    className="btn btn-sm btn-success status-item-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#showModal"
                                    onClick={(event) =>
                                      toggleStatus(event.target, item.id)
                                    }
                                  >
                                    {item.status}
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-sm btn-danger status-item-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#showModal"
                                    onClick={(event) =>
                                      toggleStatus(event.target, item.id)
                                    }
                                  >
                                    {item.status}
                                  </button>
                                )}
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
                        <ul className="pagination listjs-pagination mb-0">
                          <b>{pageNumber !== 1 ? pageNumber : null}</b>
                        </ul>
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
    </React.Fragment>
  );
};

export default withRouter(withTranslation()(LanguageDeatails));
