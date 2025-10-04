document.addEventListener('DOMContentLoaded', function() {
    // Navigation entre les sections
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.contenue-principale');
    
    // Fonction pour afficher une section spécifique et cacher les autres
    function showSection(targetId) {
        console.log('Affichage de la section:', targetId);
        
        contentSections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });
        
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.display = 'block';
        }
        
        // Mettre à jour la navigation active
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        const activeNavLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }
    }

    // Navigation par clic sur les liens
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                
                showSection(targetId);
                
                // Fermer le sidebar sur mobile
                if (window.innerWidth <= 820) {
                    document.getElementById('sidebar').classList.remove('active');
                }
                
                // Mettre à jour l'URL
                history.pushState(null, null, href);
            }
        });
    });

    // Gestion des liens d'ancrage dans le contenu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                
                showSection(targetId);
                history.pushState(null, null, href);
            }
        });
    });

    // Toggle du menu hamburger
    const hamburger = document.getElementById('hamb');
    const sidebar = document.getElementById('sidebar');
    
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Changement de thème
    const themeSwitch = document.getElementById('checkbox');
    if (themeSwitch) {
        themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            }
        });

        // Vérifier le thème sauvegardé
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeSwitch.checked = true;
        }
    }

    // Gestion du chargement initial
    function handleInitialHash() {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            showSection(hash);
        } else {
            // Par défaut, afficher la section Home
            showSection('home');
        }
    }

    // Initialisation
    handleInitialHash();

    // Gérer les changements d'URL
    window.addEventListener('hashchange', handleInitialHash);
    window.addEventListener('popstate', handleInitialHash);

    // Fermer le sidebar en cliquant à l'extérieur sur mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 820 && sidebar.classList.contains('active')) {
            if (!sidebar.contains(e.target) && e.target !== hamburger) {
                sidebar.classList.remove('active');
            }
        }
    });
});