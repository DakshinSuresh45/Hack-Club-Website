const DEFAULT_MEMBERS = [];

        // Retrieve members from LocalStorage or initialize with defaults
        function getStoredMembers() {
            const stored = localStorage.getItem('hc_club_members');
            if (stored) {
                try {
                    return JSON.parse(stored);
                } catch (e) {
                    console.error("Error parsing stored members:", e);
                }
            }
            // Seed localStorage with defaults
            localStorage.setItem('hc_club_members', JSON.stringify(DEFAULT_MEMBERS));
            return DEFAULT_MEMBERS;
        }

        // Save members array to LocalStorage
        function saveMembersToStorage(members) {
            localStorage.setItem('hc_club_members', JSON.stringify(members));
        }

        // Render members onto the grid
        function renderMembers() {
            const members = getStoredMembers();
            const grid = document.getElementById('members-grid');
            grid.innerHTML = '';

            members.forEach(member => {
                const card = document.createElement('div');
                card.className = 'glass-card p-6 rounded-2xl flex flex-col items-center text-center space-y-4 group relative';
                
                const borderColor = member.colorClass || 'border-hc-red';
                const badgeStyle = member.badgeClass || 'text-hc-accent bg-hc-accent/10';

                card.innerHTML = `
                    ${member.id.startsWith('user-') ? `
                        <button onclick="deleteMember('${member.id}')" title="Delete profile" class="absolute top-3 right-3 text-slate-500 hover:text-red-400 text-xs p-1">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    ` : ''}
                    <img src="${member.img || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300'}" 
                         onerror="this.onerror=null;this.src='https://placehold.co/300x300/0d2238/ffffff?text=Member';" 
                         alt="${member.name}" class="w-24 h-24 rounded-full object-cover border-2 ${borderColor} p-1 group-hover:scale-105 transition-transform">
                    <div>
                        <h3 class="text-xl font-bold text-white">${member.name}</h3>
                        <span class="text-xs font-mono px-2 py-0.5 rounded ${badgeStyle}">${member.role}</span>
                    </div>
                    <p class="text-slate-300 text-xs sm:text-sm leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800/80 w-full">
                        "${member.bio}"
                    </p>
                    <div class="flex gap-3 text-slate-400 text-sm pt-1">
                        <a href="#" class="hover:text-white"><i class="fa-brands fa-github"></i></a>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        // Delete custom member profile
        function deleteMember(id) {
            let members = getStoredMembers();
            members = members.filter(m => m.id !== id);
            saveMembersToStorage(members);
            renderMembers();
        }

        // Reset members list back to defaults
        function resetMembersToDefault() {
            localStorage.setItem('hc_club_members', JSON.stringify(DEFAULT_MEMBERS));
            renderMembers();
        }

        // Tab Switcher function
        function switchTab(tabName) {
            const views = document.querySelectorAll('.view-panel');
            views.forEach(v => v.classList.remove('active'));

            const navBtns = document.querySelectorAll('.nav-btn');
            navBtns.forEach(btn => {
                btn.className = 'nav-btn px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all text-slate-400 hover:text-white hover:bg-slate-800';
            });

            const activeView = document.getElementById(`view-${tabName}`);
            if (activeView) {
                activeView.classList.add('active');
            }

            const activeBtn = document.getElementById(`nav-${tabName}`);
            if (activeBtn) {
                activeBtn.className = 'nav-btn px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all text-white bg-hc-red shadow-md';
            }

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

        // Add & Persist New Member
        async function handleAddMember(e) {
            e.preventDefault();
            const name = document.getElementById('input-name').value;
            const role = document.getElementById('input-role').value;
            const bio = document.getElementById('input-bio').value;
            const urlImg = document.getElementById('input-img').value;
            const fileInput = document.getElementById('input-file');

            let finalImg = urlImg;

            // Handle custom uploaded image conversion to Base64
            if (fileInput.files && fileInput.files[0]) {
                try {
                    finalImg = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(fileInput.files[0]);
                    });
                } catch (err) {
                    console.error("Failed to read image file", err);
                }
            }

            if (!finalImg) {
                finalImg = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300";
            }

            const newMember = {
                id: 'user-' + Date.now(),
                name: name,
                role: role,
                bio: bio,
                img: finalImg,
                colorClass: 'border-hc-red',
                badgeClass: 'text-hc-accent bg-hc-accent/10'
            };

            const currentMembers = getStoredMembers();
            currentMembers.push(newMember);
            saveMembersToStorage(currentMembers);

            renderMembers();

            e.target.reset();
            toggleMemberModal();
        }

        // Initial setup on page load
        window.onload = function() {
            renderMembers();
        };