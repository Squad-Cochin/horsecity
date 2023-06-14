// { The component that displays the  details page, which includes share and favorite options,
// is located under the menu bar }

import Breadcrumb from "react-bootstrap/Breadcrumb";
import Styles from "./BreadcrumbType.module.scss";
import Container from "react-bootstrap/Container";
import Wishlist from "../../../asset/images/wishlist.svg";
import Wishlistfill from "../../../asset/images/wishlist-fill.svg";
import Share from "../../../asset/images/share.svg";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
function BreadcrumbType(props) {
  return (
    <div className={Styles.breadcrumbOuter}>

      <Container>
        <div className={Styles.breadcrumbList}>
          <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Destinations</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Cancun</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Bsea Cancún Plaza Hotel</Breadcrumb.Item>
          </Breadcrumb>
          <div className={Styles.storeList}>
            {/* Share option */}
            <Link className={Styles.shareBtn} href="/">
              <Image src={Share} alt="" />
            </Link>
            {/* Wish list */}
            <Link className={Styles.wishlistBtn} href="/">
              {props.wishlist? <Image src={Wishlistfill} alt="" />: <Image src={Wishlist} alt="" />}
            </Link>
          </div>
        </div>
      </Container>
    
    </div>
  );
}

export default BreadcrumbType;
