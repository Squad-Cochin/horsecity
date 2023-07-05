import React from 'react';
import { Container } from "reactstrap";

import {useNavigate} from "react-router-dom"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

    const ProfilePage = () => {
        const navigate = useNavigate();
        document.title = "Profile | Horscity";

        return (
            <>
                <div className="page-content">
                    <Container fluid={false}>
                        <Breadcrumbs title="Profile Page" breadcrumbItem="Profile Page" />
                        <h1>Welcome</h1>
                        <div>
                            <button onClick={()=>navigate("/change-password")}>Change password</button>
                        </div>

                    </Container>
                </div>
            </>
        );
    }

export default ProfilePage;