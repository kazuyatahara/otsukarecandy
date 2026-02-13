// Member and Greeting Data
const members = [
    {
        name: 'Mint',
        color: '#E0F2F1',
        messages: [
            '……あと5分。いや、あと3分寝かせて。社会が私を待ってなくても、布団が私を待ってるの',
            '今日の占い12位だったし。ラッキーアイテム『判子』って何？ 会社行けってこと？ 帰りたい……',
            'さわやかミントで君のハートもリフレッシュ☆'
        ]
    },
    {
        name: 'Momone',
        color: '#FFCCBC',
        messages: [
            'ふあぁ〜おはよぉ……痛っ！ 電柱あるの忘れてたぁ〜。……え？ 電柱凹んでない？ 大丈夫？',
            'おにぎり5個持ってきたの♡ お腹空くと力出ないからねぇ',
            'ふわふわ〜っと、わたあめみたいにモモネが元気をお届け♡'
        ]
    },
    {
        name: 'Vanilla',
        color: '#FFFFFF',
        messages: [
            'あら？ 今日のオーラは少し濁っていますね。邪気を払っておきましょう。（背中をバン！と叩く）',
            '悪い子には『特別なお注射』をしちゃいますよ？（極太の注射器を笑顔で構える）',
            '癒やしの魔法を召し上がれ。ぎゅってしてあげる。'
        ]
    },
    {
        name: 'Ruru',
        color: '#E1BEE7',
        messages: [
            '……お、おはよ。今日の私は一段とクールでしょ？ ……え？ 寝癖ついてる？ ……うそっ！',
            'べ、別に猫動画なんて見てないわよ！ ……肉球プニプニしたいぃ……',
            'がんばってる人、ちゃんと見てるからね。'
        ]
    },
    {
        name: 'Ameri',
        color: '#FFE082',
        messages: [
            'あー、今すぐこの書類丸めて口に詰め込みたい',
            '誰だ私のプロテイン飲んだやつ。正直に言えばスクワット50回で許してやる',
            '私の笑顔は、キミのエナジードリンクだよ！'
        ]
    }
];

// Floating Candy Background
function createCandyParticles() {
    const bg = document.getElementById('bg-animation');
    const candySymbols = ['🍬', '🍭', '🧁', '🍮', '🍩', '⭐', '💖', '✨'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'candy-particle';
            particle.textContent = candySymbols[Math.floor(Math.random() * candySymbols.length)];

            const left = Math.random() * 100;
            const size = 20 + Math.random() * 40;
            const duration = 10 + Math.random() * 20;
            const delay = -Math.random() * 20;
            const wiggle = 20 + Math.random() * 30;

            particle.style.left = `${left}%`;
            particle.style.fontSize = `${size}px`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;

            // Add custom wiggle property for animation
            particle.style.setProperty('--wiggle', `${wiggle}px`);

            bg.appendChild(particle);
        }, i * 300);
    }
}

// Healing Modal Logic
function initHealingModal() {
    const btn = document.getElementById('healing-btn');
    const modal = document.getElementById('healing-modal');
    const close = document.querySelector('.close');
    const nameArea = document.querySelector('.healing-name');
    const messageArea = document.querySelector('.healing-message');

    btn.onclick = () => {
        const member = members[Math.floor(Math.random() * members.length)];
        const message = member.messages[Math.floor(Math.random() * member.messages.length)];

        nameArea.textContent = `From: ${member.name}`;
        messageArea.textContent = `「${message}」`;
        modal.style.display = "block";
    };

    close.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

// Initial Smooth Scroll with Offset
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createCandyParticles();
    initHealingModal();
    initSmoothScroll();
});
