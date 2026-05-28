// ===== 安全验证核心逻辑（完整保留）=====
        const overlay = document.getElementById('verification-overlay');
        const pageContent = document.querySelector('.page-content');
        const spinner = document.getElementById('verification-spinner');
        const errorEl = document.getElementById('verification-error');

        // 错误提示处理
        function showError(message) {
            errorEl.textContent = `错误: ${message}`;
            errorEl.classList.remove('hidden');
            // 5秒后自动隐藏错误
            setTimeout(() => errorEl.classList.add('hidden'), 5000);
        }

        // Turnstile 验证成功回调（与服务器交互）
        function onTurnstileSuccess(token) {
            console.log("Turnstile 验证通过，Token:", token);
            // 显示加载状态
            spinner.classList.remove('hidden');
            errorEl.classList.add('hidden');

            // 发送 Token 到服务器验证（核心安全步骤）
            fetch("https://worker.zhangyangcheng.xyz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token })
            })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP 错误: ${res.status}`);
                return res.json();
            })
            .then(result => {
                spinner.classList.add('hidden');
                if (result.success) {
                    // 验证通过：隐藏覆盖层，显示页面
                    overlay.classList.add('opacity-0');
                    setTimeout(() => {
                        overlay.style.display = 'none';
                        pageContent.style.display = 'block';
                        initPageAnimations(); // 初始化页面动画
                    }, 500);
                } else {
                    // 服务器验证失败
                    showError(result.error || "验证失败，请重试");
                    window.turnstile?.reset(); // 重置验证组件
                }
            })
            .catch(err => {
                console.error("服务器验证出错:", err);
                spinner.classList.add('hidden');
                showError("网络错误，请检查连接后重试");
                window.turnstile?.reset();
            });
        }

        // Turnstile 验证失败回调
        function onTurnstileError(error) {
            console.error("Turnstile 验证出错:", error);
            showError("验证组件加载失败，请刷新页面重试");
        }

        // ===== 页面动画与交互逻辑 =====
        function initPageAnimations() {
            // 1. 导航栏滚动效果
            const navbar = document.getElementById('navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('py-2', 'shadow-elevation-1');
                    navbar.classList.remove('py-3', 'shadow-sm');
                } else {
                    navbar.classList.add('py-3', 'shadow-sm');
                    navbar.classList.remove('py-2', 'shadow-elevation-1');
                }
            });

            // 2. 移动端菜单切换
            const menuToggle = document.getElementById('menu-toggle');
            const mobileMenu = document.getElementById('mobile-menu');
            menuToggle.addEventListener('click', () => {
                const isOpen = !mobileMenu.classList.contains('opacity-0');
                // 切换菜单状态
                mobileMenu.classList.toggle('opacity-0', isOpen);
                mobileMenu.classList.toggle('-translate-y-full', isOpen);
                mobileMenu.classList.toggle('pointer-events-none', isOpen);
                mobileMenu.classList.toggle('opacity-100', !isOpen);
                mobileMenu.classList.toggle('translate-y-0', !isOpen);
                mobileMenu.classList.toggle('pointer-events-auto', !isOpen);
                // 切换图标
                menuToggle.innerHTML = isOpen ? 
                    '<i class="fa fa-bars" aria-hidden="true"></i>' : 
                    '<i class="fa fa-times" aria-hidden="true"></i>';
            });

            // 3. 滚动显示动画
            const revealElements = document.querySelectorAll('.reveal');
            function checkReveal() {
                revealElements.forEach(el => {
                    const windowHeight = window.innerHeight;
                    const elementTop = el.getBoundingClientRect().top;
                    const elementVisible = 150;
                    if (elementTop < windowHeight - elementVisible) {
                        el.classList.add('active');
                    }
                });
            }
            // 初始检查 + 滚动时检查
            checkReveal();
            window.addEventListener('scroll', checkReveal);

            // 4. 平滑滚动
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                    // 关闭移动端菜单
                    if (!mobileMenu.classList.contains('opacity-0')) {
                        mobileMenu.classList.add('opacity-0', '-translate-y-full', 'pointer-events-none');
                        menuToggle.innerHTML = '<i class="fa fa-bars" aria-hidden="true"></i>';
                    }
                    // 滚动到目标位置
                    const targetId = anchor.getAttribute('href');
                    const targetEl = document.querySelector(targetId);
                    if (targetEl) {
                        window.scrollTo({
                            top: targetEl.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // 5. 复制功能
            const copyEmailBtn = document.getElementById('copy-email');
            const copyWechatBtn = document.getElementById('copy-wechat');
            const emailText = document.getElementById('email-text').textContent.trim();
            const wechatText = document.getElementById('wechat-text').textContent.trim();

            // 复制邮箱
            copyEmailBtn.addEventListener('click', async () => {
                await copyToClipboard(emailText, copyEmailBtn);
            });
            // 复制微信号
            copyWechatBtn.addEventListener('click', async () => {
                await copyToClipboard(wechatText, copyWechatBtn);
            });

            // 通用复制函数
            async function copyToClipboard(text, btn) {
                try {
                    await navigator.clipboard.writeText(text);
                    const originalHTML = btn.innerHTML;
                    // 显示复制成功状态
                    btn.innerHTML = '<i class="fa fa-check mr-2" aria-hidden="true"></i>已复制';
                    btn.classList.add('bg-green-500');
                    // 2秒后恢复原状态
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.classList.remove('bg-green-500');
                    }, 2000);
                } catch (err) {
                    console.error("复制失败:", err);
                    showToast("复制失败，请手动复制");
                }
            }

            // 6. 额外动画效果
            // "敬请期待" 图标旋转
            document.querySelectorAll('.cursor-not-allowed').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    el.querySelector('i').classList.add('fa-spin');
                });
                el.addEventListener('mouseleave', () => {
                    el.querySelector('i').classList.remove('fa-spin');
                });
            });

            // 社交卡片图标弹跳
            document.querySelectorAll('#social a').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    const icon = card.querySelector('i');
                    icon.classList.add('fa-bounce');
                    setTimeout(() => icon.classList.remove('fa-bounce'), 1000);
                });
            });

            // 简易提示框
            function showToast(message) {
                const toast = document.createElement('div');
                toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-dark text-white px-4 py-2 rounded-lg shadow-elevation-2 z-50';
                toast.textContent = message;
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 3000);
            }
        }

        // 页面加载完成后初始化验证组件状态
        window.addEventListener('load', () => {
            if (!overlay || !pageContent) {
                console.error("安全验证核心元素缺失");
            }
        });
