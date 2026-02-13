// --- Cosmic Prompt Composer Engine (Enhanced) ---

const KEYWORD_MAP = {
    "女神": "Goddess", "女性": "Woman", "少女": "Girl", "老婆": "Old wise woman",
    "運命": "Fate, Destiny", "秘密": "Secret, Mystery", "光": "Radiant light",
    "闇": "Deep shadows, Void", "道": "Path, Portal", "猫": "Mystical cat",
    "タロット": "Tarot cards", "水晶": "Crystal ball", "星": "Stars",
    "月": "Moon", "太陽": "Sun", "雲": "Clouds", "森": "Enchanted forest",
    "海": "Starlight ocean", "炎": "Magical fire", "花": "Ethereal flowers"
};

const DESCRIPTORS = {
    atmospheres: [
        { en: "vibrant and colorful mystical atmosphere, shimmering with spiritual peace and radiance", jp: "鮮やかで色彩豊かな神秘的雰囲気、精神的な安らぎと輝きが揺らめる" },
        { en: "glamorous cosmic sanctuary, magnificent and filled with serene spiritual energy", jp: "華やかで壮大な宇宙の聖域、静かな精神的エネルギーに満ちた空間" },
        { en: "dazzling and sacred space, vibrant with rainbow-colored divine light", jp: "眩いほど神聖な空間、虹色の神聖な光で華やかに彩られている" },
        { en: "spectacular celestial realm, peaceful and sparkling with colorful nebulae", jp: "色とりどりの星雲が輝く、安らかで壮観な天界の世界" },
        { en: "luxurious and tranquil fortune-telling sanctuary, opulent and spiritually soothing", jp: "豪華で落ち着いた占いの聖域、華麗で精神を癒やすような空間" }
    ],
    cosmic_elements: [
        { en: "magnificent colorful nebulae and vibrant dazzling star bursts", jp: "壮大で色彩豊かな星雲と、鮮やかで眩い星の爆発" },
        { en: "brilliant celestial symbols, glowing with peaceful rainbow-colored auras", jp: "安らぎを感じる虹色のオーラを放つ、輝かしい天体のシンボル" },
        { en: "dazzling multi-colored auroras and glittering vibrant cosmic dust", jp: "眩い多色のオーラと、きらめく鮮やかな宇宙の塵" },
        { en: "exquisite crystal spheres reflecting a vibrant kaleidoscope of peaceful star light", jp: "安らかな星の光が万華鏡のように鮮やかに映り込む、精巧な水晶玉" },
        { en: "resplendent colorful constellations and intricate golden spiritual patterns", jp: "光り輝く色彩豊かな星座と、複雑な黄金の精神的模様" }
    ],
    clothing: [
        { en: "wearing magnificent modest robes, colorful silks adorned with sparkling jewels", jp: "輝く宝石と色彩豊かなシルクをあしらった、壮麗で控えめなローブを着用" },
        { en: "adorned in glamorous conservative mystical attires, vibrant with intricate gold and silk drapes", jp: "複雑な金刺繍と鮮やかなシルクのドレープできらめく、華やかで控えめな装束" },
        { en: "dressed in elegant, layered fabrics with dazzling starlight and peaceful vibrant colors", jp: "眩い星明かりと安らかな色彩が施された、優雅な重ね着の衣装" },
        { en: "wearing a spectacular and dignified silhouette, luxurious colorful yet modest garments", jp: "豪華で色彩豊かでありながら控えめな、壮観で威厳のあるシルエット" },
        { en: "shrouded in opulent multi-colored silk drapes, shimmering with peaceful celestial elegance", jp: "天上の安らかな優雅さで揺らめく、華麗な多色のシルクに包まれて" }
    ],
    lighting: [
        { en: "bathed in brilliant cinematic starlight and dazzling colorful radiant halos", jp: "輝かしい映画のような星明かりと、眩い多色の後光に包まれて" },
        { en: "illuminated by spectacular golden candlelight and vibrant peaceful ethereal glows", jp: "壮観な黄金のキャンドルの火と、鮮やかで安らかな空霊の輝きに照らされて" },
        { en: "shining under the resplendent light of countless glittering colorful stars", jp: "無数のきらめく色彩豊かな星々の光り輝く下で" },
        { en: "lit by a magnificent mystical luminescence, glowing with vibrant peaceful highlights", jp: "鮮やかで安らかなハイライトが光る、壮大な神秘的発光" },
        { en: "surrounded by a brilliant, spiritual inner glow and dazzling colorful divine radiance", jp: "眩い多色の神聖な光芒と、輝かしい精神的な内なる輝きに囲まれて" }
    ],
    backgrounds: [
        { en: "opulent celestial temple architecture, decorated with vibrant gold and colorful crystals", jp: "鮮やかな金と色彩豊かな水晶で装飾された、華麗な天上の寺院建築" },
        { en: "vast, spectacular starfield merging with vibrant colorful peaceful clouds", jp: "鮮やかな色彩の安らかな雲と溶け合う、広大で壮観な星野" },
        { en: "magnificent crystal cave, sparkling with vibrant prismatic and peaceful light", jp: "鮮やかなプリズムの光と安らかな光で輝く、壮大な水晶の洞窟" },
        { en: "majestic mountain peak, peaceful under a vibrant and dazzling colorful cosmos", jp: "鮮やかさと色彩を放つ眩しい宇宙の下、安らかで威厳のある山頂" },
        { en: "resplendent sanctuary filled with vibrant shimmering incense and golden spiritual artifacts", jp: "鮮やかに揺らめくお香と神聖な遺物に満ちた、光り輝く聖域" }
    ],
    style_tags: ":: mystical :: ethereal :: highly detailed :: colorful lighting :: cinematic composition :: fantasy style :: intricate :: dreamlike"
};

function translateKeywords(text) {
    let foundKeywords = [];
    for (const [jp, en] of Object.entries(KEYWORD_MAP)) {
        if (text.includes(jp)) {
            foundKeywords.push(en);
        }
    }
    return foundKeywords.join(", ");
}

function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function parseAndCompose(text) {
    const keywords = translateKeywords(text);
    const atmosphere = getRandom(DESCRIPTORS.atmospheres);
    const clothing = getRandom(DESCRIPTORS.clothing);
    const lighting = getRandom(DESCRIPTORS.lighting);
    const setting = getRandom(DESCRIPTORS.backgrounds);
    const details = getRandom(DESCRIPTORS.cosmic_elements);

    const promptElements = [
        keywords,
        atmosphere.en,
        `Character is ${clothing.en}`,
        `Lighting is ${lighting.en}`,
        `Setting: ${setting.en}`,
        `Details: ${details.en}`
    ].filter(e => e && e.trim().length > 0);

    const prompt = `/imagine prompt: ${promptElements.join(', ')}`;

    const explanation = `【構成イメージ】\n●抽出された要素: ${keywords || "（神秘の要素を自動付与）"}\n●雰囲気: ${atmosphere.jp}\n●衣装: ${clothing.jp}（露出控えめ）\n●照明: ${lighting.jp}\n●背景: ${setting.jp}\n●詳細: ${details.jp}`;

    return { prompt, explanation };
}

function splitTextIntoScenes(text) {
    return text.split(/[。.\n]+/)
        .map(s => s.trim())
        .filter(s => s.length > 5);
}

document.addEventListener('DOMContentLoaded', () => {
    const genBtn = document.getElementById('generate-btn');
    const userText = document.getElementById('user-text');
    const resultContainer = document.getElementById('result-container');
    const promptList = document.getElementById('prompt-list');

    genBtn.onclick = () => {
        const text = userText.value.trim();
        if (!text) {
            alert('天啓を授けるための言葉を入力してください。');
            return;
        }

        const scenes = splitTextIntoScenes(text);
        promptList.innerHTML = '';

        scenes.forEach(scene => {
            const result = parseAndCompose(scene);
            const el = createPromptElement(result.prompt, result.explanation);
            promptList.appendChild(el);
        });

        resultContainer.classList.remove('hidden');
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    };
});

function createPromptElement(prompt, explanation) {
    const div = document.createElement('div');
    div.className = 'prompt-item card';

    const expDiv = document.createElement('div');
    expDiv.className = 'prompt-explanation';
    expDiv.innerText = explanation;

    const p = document.createElement('p');
    p.className = 'prompt-text';
    p.textContent = prompt;

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = '写し取る（コピー）';
    btn.onclick = () => {
        navigator.clipboard.writeText(prompt);
        btn.textContent = '写し取りました！';
        setTimeout(() => btn.textContent = '写し取る（コピー）', 2000);
    };

    div.appendChild(expDiv);
    div.appendChild(p);
    div.appendChild(btn);
    return div;
}
