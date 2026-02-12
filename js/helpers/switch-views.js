function switchMobileView(view){
    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    const aside = document.querySelector('aside');

    const isMobile = window.matchMedia("(max-width:600px)").matches;

    if(!isMobile){
        return;
    }

    nav.style.display = 'none';
    main.style.display = 'none';
    aside.style.display = 'none';

    if(view === 'nav'){
        nav.style.display = 'block';
    }
    else if(view === 'chat'){
        main.style.display = 'flex';
    }
    else if(view === 'profile'){
        aside.style.display = 'block';
    }
}

export default switchMobileView;
