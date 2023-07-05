import React from 'react';
import { Container } from "reactstrap";

import {useNavigate} from "react-router-dom"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

    const ProfilePage = () => {
        const navigate = useNavigate();
        document.title = "New Page | Upzet - React Admin & Dashboard Template";

        return (
            <>
                <div className="page-content">
                    <Container fluid={false}>
                        {/* <Breadcrumbs title="New Page" breadcrumbItem="New Page" /> */}
                        <h1>Welcome</h1>
                        <div>
                            <button onClick={()=>navigate("/change-password")}>Click Me</button>
                        </div>

                    </Container>
                </div>
            </>
        );
    }

export default ProfilePage;