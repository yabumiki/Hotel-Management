document.addEventListener('DOMContentLoaded', function() {
    // Toggle between homepage and admin dashboard
    const adminLoginBtn = document.getElementById('admin-login');
    const homepage = document.getElementById('homepage');
    const adminDashboard = document.getElementById('admin-dashboard');
    
    adminLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        homepage.style.display = 'none';
        adminDashboard.style.display = 'flex';
        
        // Initialize admin dashboard
        initAdminDashboard();
    });
    
    // Mobile menu toggle for homepage
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const homeNav = document.querySelector('.home-nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        homeNav.style.display = homeNav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Smooth scrolling for homepage navigation
    document.querySelectorAll('.home-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update active nav item
                document.querySelectorAll('.home-nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Initialize admin dashboard functions
    function initAdminDashboard() {
        // Set current date
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('today-date').textContent = today.toLocaleDateString('en-US', options);
        
        // Navigation between sections
        const navItems = document.querySelectorAll('.main-nav li');
        const contentSections = document.querySelectorAll('.content-section');
        
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const sectionId = this.getAttribute('data-section');
                
                // Update active nav item
                navItems.forEach(navItem => navItem.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding section
                contentSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === sectionId) {
                        section.classList.add('active');
                    }
                });
            });
        });
        
        // Modal functionality
        const modal = document.getElementById('reservation-modal');
        const newReservationBtn = document.getElementById('new-reservation-btn');
        const closeModalBtn = document.querySelector('.close-modal');
        const closeModalBtns = document.querySelectorAll('.close-modal-btn');
        
        newReservationBtn.addEventListener('click', function() {
            modal.style.display = 'flex';
        });
        
        closeModalBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Initialize charts
        const monthlyOccupancyCtx = document.getElementById('monthlyOccupancyChart').getContext('2d');
        const revenueSourcesCtx = document.getElementById('revenueSourcesChart').getContext('2d');
        
        const monthlyOccupancyChart = new Chart(monthlyOccupancyCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Occupancy Rate',
                    data: [65, 68, 72, 75, 80, 85, 78],
                    backgroundColor: 'rgba(58, 134, 255, 0.1)',
                    borderColor: 'rgba(58, 134, 255, 1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
        
        const revenueSourcesChart = new Chart(revenueSourcesCtx, {
            type: 'doughnut',
            data: {
                labels: ['Rooms', 'Restaurant', 'Spa', 'Other'],
                datasets: [{
                    data: [65, 20, 10, 5],
                    backgroundColor: [
                        'rgba(58, 134, 255, 0.8)',
                        'rgba(6, 214, 160, 0.8)',
                        'rgba(255, 190, 11, 0.8)',
                        'rgba(239, 71, 111, 0.8)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
        
        // Room status click events
        document.querySelectorAll('.room-status').forEach(room => {
            room.addEventListener('click', function() {
                alert(`Room ${this.querySelector('span').textContent} clicked. Status: ${this.classList.contains('available') ? 'Available' : 
                      this.classList.contains('occupied') ? 'Occupied' : 
                      this.classList.contains('maintenance') ? 'Maintenance' : 'Reserved'}`);
            });
        });
        
        // Staff table row click
        document.querySelectorAll('#staff-table tbody tr').forEach(row => {
            row.addEventListener('click', function(e) {
                if (!e.target.classList.contains('table-btn')) {
                    const name = this.cells[1].textContent;
                    alert(`Viewing details for staff: ${name}`);
                }
            });
        });
    }
    
    // Responsive adjustments
    function handleResponsive() {
        if (window.innerWidth < 992) {
            homeNav.style.display = 'none';
        } else {
            homeNav.style.display = 'flex';
        }
    }
    
    window.addEventListener('resize', handleResponsive);
    handleResponsive();
});