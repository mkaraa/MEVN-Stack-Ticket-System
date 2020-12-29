const isLoggedIn = () => {
    // TODO: jwt dogru mu ve exprire mi değil mi check et ona gore return

    var isLogged = true;

    if (localStorage.getItem("token") == "") {
        isLogged = false;
    }

    return isLogged;
}

export default isLoggedIn