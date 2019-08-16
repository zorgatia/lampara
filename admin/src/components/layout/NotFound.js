import React, { Fragment } from "react";
import{Link} from "react-router-dom"

const NotFound = () => {
    return (
        <Fragment>
            <div class="content-body">
                <div class="container">
                    
                        <div class="error-content">
                            <div class="card m-b-0">
                                <div class="card-body text-center">
                                    <h1 class="error-text text-primary">404</h1>
                                    <h4 class="m-t-15">
                                        <i class="fa fa-exclamation-triangle m-r-5 text-warning" />{" "}
                                        Sorry but we couldnt find this page
                                    </h4>
                                    <p>
                                        We could not find the page you were
                                        looking for. Meanwhile, you may return
                                        to dashboard or try using the search
                                        form.
                                    </p>
                                    <form class="m-t-30 m-b-30">
                                        <div class="text-center m-b-15 m-t-15">
                                            <Link
                                                to="index.html"
                                                class="btn btn-primary"
                                            >
                                                Accueil
                                            </Link>
                                        </div>
                                    </form>
                                    <div class="text-center">
                                        <p>
                                            Copyright &copy;{" "}
                                            <a href="https://ule.merkulov.design">
                                                Ule
                                            </a>{" "}
                                            2019, by{" "}
                                            <a
                                                href="https://1.envato.market/tf-merkulove"
                                                target="_blank"
                                            >
                                                merkulove
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="error-img error-content">
                            <img
                                src="/assets/images/error/404.png"
                                alt=""
                                class="img-fluid"
                            />
                        </div>
                    </div>
                
            </div>
        </Fragment>
    );
};

export default NotFound;
