        const btn = document.querySelector('.sidebar-toggle-btn');
        const sidebar = document.querySelector('.sidebar__container');
        
        btn.addEventListener('click', () => {
            sidebar.classList.toggle('sidebar--show');
        });

        function toggleSidebar() {
          sidebar.classList.toggle('sidebar--show');
        }
        sidebar.addEventListener('mouseenter', toggleSidebar);
        sidebar.addEventListener('mouseleave', toggleSidebar);


        document.addEventListener("DOMContentLoaded", function() {
            const menuItems = document.querySelectorAll(".sidebar__menu-item");
        
            menuItems.forEach(item => {
                item.addEventListener("click", function() {
                    menuItems.forEach(menuItem => {
                        menuItem.classList.remove("sidebar__menu-item--active");
                    });
                    this.classList.add("sidebar__menu-item--active");
                });
            });
        });
        