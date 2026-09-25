// Tab Switcher function
        function switchTab(tabName) {
            // Hide all views
            const views = document.querySelectorAll('.view-panel');
            views.forEach(v => v.classList.remove('active'));

            // Reset navigation button styles
            const navBtns = document.querySelectorAll('.nav-btn');
            navBtns.forEach(btn => {
                btn.className = 'nav-btn px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all text-slate-400 hover:text-white hover:bg-slate-800';
            });

            // Activate target view
            const activeView = document.getElementById(`view-${tabName}`);
            if (activeView) {
                activeView.classList.add('active');
            }

            // Highlight target button
            const activeBtn = document.getElementById(`nav-${tabName}`);
            if (activeBtn) {
                activeBtn.className = 'nav-btn px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all text-white bg-hc-red shadow-md';
            }

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Toggle Member Modal
        function toggleMemberModal() {
            const modal = document.getElementById('memberModal');
            if (modal.classList.contains('hidden')) {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            } else {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        }

        // Add Member Dynamically
        function handleAddMember(e) {
            e.preventDefault();
            const name = document.getElementById('input-name').value;
            const role = document.getElementById('input-role').value;
            const bio = document.getElementById('input-bio').value;

            const grid = document.getElementById('members-grid');

            const card = document.createElement('div');
            card.className = 'glass-card p-6 rounded-2xl flex flex-col items-center text-center space-y-4 group';
            card.innerHTML = `
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300" 
                     alt="Member Profile" class="w-24 h-24 rounded-full object-cover border-2 border-hc-red p-1 group-hover:scale-105 transition-transform">
                <div>
                    <h3 class="text-xl font-bold text-white">${name}</h3>
                    <span class="text-xs font-mono text-hc-accent bg-hc-accent/10 px-2 py-0.5 rounded">${role}</span>
                </div>
                <p class="text-slate-300 text-xs sm:text-sm leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800/80 w-full">
                    "${bio}"
                </p>
                <div class="flex gap-3 text-slate-400 text-sm pt-1">
                    <a href="#" class="hover:text-white"><i class="fa-brands fa-github"></i></a>
                </div>
            `;

            grid.appendChild(card);

            // Reset and close
            e.target.reset();
            toggleMemberModal();
        }