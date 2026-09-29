(() => {
  "use strict";

  const STORAGE_KEY = "oceanBigFiveAnswersV1";
  const TRAITS = ["O", "C", "E", "A", "N"];

  const traitInfo = {
    O: { name: "Openness", th: "การเปิดรับประสบการณ์", desc: "ความสนใจในความคิดใหม่ ความสร้างสรรค์ และการเรียนรู้", strengths: "อาจสะท้อนความสนใจในการเรียนรู้ การทดลอง และการมองเห็นความเป็นไปได้หลายรูปแบบ", caution: "อาจให้ความสนใจกับทางเลือกหรือแนวคิดใหม่จำนวนมากจนต้องใช้เวลาในการคัดเลือกสิ่งที่เหมาะกับบริบท", investment: "อาจเปิดรับข้อมูล มุมมอง หรือสินทรัพย์รูปแบบใหม่ได้ง่ายขึ้น" },
    C: { name: "Conscientiousness", th: "ความรอบคอบ", desc: "การวางแผน ความมีวินัย ความรับผิดชอบ และความเป็นระบบ", strengths: "อาจสะท้อนความใส่ใจการวางแผน การติดตามงาน และการทำสิ่งต่าง ๆ ให้เป็นระบบ", caution: "เมื่อความเป็นระบบสำคัญมาก อาจต้องระวังการยึดแผนมากเกินไปเมื่อสถานการณ์เปลี่ยน", investment: "อาจให้ความสำคัญกับการวางแผน การกำหนดกติกา และการติดตามพอร์ตอย่างเป็นระบบ" },
    E: { name: "Extraversion", th: "การแสดงออกและสังคม", desc: "การเข้าสังคม ความกระตือรือร้น และความสบายใจในการมีปฏิสัมพันธ์", strengths: "อาจสะท้อนความสบายใจในการแลกเปลี่ยนความคิดเห็น การริเริ่มบทสนทนา และกิจกรรมร่วมกับผู้อื่น", caution: "อาจได้รับข้อมูลหรือแรงกระตุ้นจากสังคมค่อนข้างมาก จึงอาจเป็นประโยชน์ที่จะตรวจสอบข้อมูลด้วยตนเอง", investment: "อาจมีแนวโน้มได้รับอิทธิพลจากการแลกเปลี่ยนความคิดเห็นหรือกิจกรรมทางสังคมมากขึ้น" },
    A: { name: "Agreeableness", th: "ความร่วมมือและเห็นอกเห็นใจ", desc: "ความเข้าใจผู้อื่น ความร่วมมือ และการประนีประนอม", strengths: "อาจสะท้อนความใส่ใจความรู้สึกของผู้อื่น ความร่วมมือ และการหาทางออกร่วมกัน", caution: "เมื่อให้ความสำคัญกับความรู้สึกหรือความเห็นของผู้อื่นมาก อาจเป็นประโยชน์ที่จะรักษาพื้นที่สำหรับความต้องการของตนเองด้วย", investment: "อาจให้ความสำคัญกับความสัมพันธ์และความคิดเห็นของผู้อื่นเมื่อตัดสินใจ" },
    N: { name: "Neuroticism", th: "ความไวต่อความเครียด", desc: "ความไวต่อแรงกดดัน ความกังวล และความไม่แน่นอน", strengths: "เมื่อคะแนนอยู่ในช่วงต่ำกว่า อาจสะท้อนแนวโน้มที่จะรับมือกับความไม่แน่นอนโดยไม่ถูกความกังวลรบกวนมากนัก", caution: "เมื่อคะแนนสูง อาจมีแนวโน้มให้ความสนใจกับความเสี่ยง ความไม่แน่นอน หรือแรงกดดันมากขึ้น", investment: "เมื่อคะแนนสูง อาจไวต่อความไม่แน่นอนและความผันผวนมากขึ้น จึงควรแยกความรู้สึกออกจากการประเมินข้อมูลและแผนการตัดสินใจ" }
  };

  const questions = [
    ["O","ฉันชอบเรียนรู้เรื่องใหม่ ๆ แม้เรื่องนั้นจะไม่เกี่ยวกับสิ่งที่ฉันทำอยู่"],
    ["O","ฉันสนใจแนวคิดหรือมุมมองที่แตกต่างจากตัวเอง"],
    ["O","ฉันชอบทดลองวิธีใหม่ ๆ มากกว่าทำตามวิธีเดิมเสมอ"],
    ["O","ฉันมักสนใจเรื่องที่คนทั่วไปอาจมองว่าแปลกหรือไม่คุ้นเคย"],
    ["O","ฉันสนุกกับการคิดถึงความเป็นไปได้หลายรูปแบบ"],
    ["O","เมื่อมีแนวคิดใหม่ ฉันมักอยากลองทำความเข้าใจก่อนตัดสินว่าใช้ได้หรือไม่ได้"],
    ["C","ก่อนเริ่มงานสำคัญ ฉันมักวางแผนขั้นตอนเอาไว้"],
    ["C","หากฉันตั้งเป้าหมายไว้ ฉันพยายามทำให้สำเร็จตามแผน"],
    ["C","ฉันให้ความสำคัญกับรายละเอียดและตรวจสอบงานของตัวเอง"],
    ["C","ฉันมักจัดลำดับความสำคัญของสิ่งที่ต้องทำ"],
    ["C","ฉันพยายามทำงานให้เสร็จตามเวลาที่กำหนด"],
    ["C","ฉันรู้สึกไม่สบายใจเมื่อทำงานโดยไม่มีการวางแผนเลย"],
    ["E","ฉันรู้สึกสบายใจเมื่อได้พูดคุยหรือทำงานร่วมกับคนอื่น"],
    ["E","ในกลุ่มคน ฉันมักเป็นคนที่แสดงความคิดเห็น"],
    ["E","ฉันสามารถเริ่มบทสนทนากับคนที่เพิ่งรู้จักได้ค่อนข้างง่าย"],
    ["E","ฉันชอบกิจกรรมที่มีผู้คนจำนวนมาก"],
    ["E","ฉันรู้สึกมีพลังเมื่อได้พบปะผู้คน"],
    ["E","ฉันมักแสดงความรู้สึกหรือความคิดเห็นของตัวเองอย่างเปิดเผย"],
    ["A","ฉันพยายามเข้าใจมุมมองของคนอื่นแม้จะไม่เห็นด้วย"],
    ["A","ฉันมักหลีกเลี่ยงความขัดแย้งที่ไม่จำเป็น"],
    ["A","เมื่อทำงานร่วมกับคนอื่น ฉันให้ความสำคัญกับความรู้สึกของสมาชิกในกลุ่ม"],
    ["A","ฉันพร้อมช่วยเหลือคนอื่นเมื่อมีโอกาส"],
    ["A","ฉันพยายามหาวิธีที่ทุกฝ่ายสามารถยอมรับได้เมื่อเกิดความขัดแย้ง"],
    ["A","ฉันมักคำนึงถึงผลกระทบของการกระทำของตัวเองที่มีต่อผู้อื่น"],
    ["N","เมื่อเจอสถานการณ์ไม่แน่นอน ฉันมักกังวลกับสิ่งที่อาจเกิดขึ้น"],
    ["N","เมื่อเกิดปัญหา ฉันมีแนวโน้มคิดวนหรือกังวลกับปัญหานั้น"],
    ["N","ฉันค่อนข้างไวต่อความกดดันหรือความเครียด"],
    ["N","ฉันมักรู้สึกไม่สบายใจเมื่อไม่สามารถควบคุมสถานการณ์ได้"],
    ["N","เรื่องเล็ก ๆ บางเรื่องสามารถทำให้ฉันกังวลได้มาก"],
    ["N","เมื่อมีหลายเรื่องเกิดขึ้นพร้อมกัน ฉันมักรู้สึกกดดันได้ง่าย"]
  ].map((q, i) => ({ id: i + 1, trait: q[0], text: q[1], reverseScored: false }));

  let answers = {};
  let current = 0;
  let processing = false;

  const $ = id => document.getElementById(id);
  const views = ["homeView","testView","resultView","errorView"];

  function showView(id) {
    views.forEach(v => $(v).classList.toggle("active", v === id));
    window.scrollTo({top:0, behavior:"smooth"});
    $("restartTop").hidden = id === "homeView" || id === "resultView" || id === "errorView";
  }

  function validateQuestionBank() {
    if (questions.length !== 30) throw new Error("Question bank must contain exactly 30 questions.");
    const counts = Object.fromEntries(TRAITS.map(t => [t, 0]));
    for (const q of questions) {
      if (!TRAITS.includes(q.trait)) throw new Error(`Invalid trait on question ${q.id}.`);
      counts[q.trait]++;
      if (!q.id || !q.text || typeof q.reverseScored !== "boolean") throw new Error(`Invalid question schema on question ${q.id}.`);
    }
    if (TRAITS.some(t => counts[t] !== 6)) throw new Error("Each trait must contain exactly 6 questions.");
  }

  function loadAnswers() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return {};
      const parsed = JSON.parse(saved);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (e) {
      console.warn("Could not restore local answers:", e);
      return {};
    }
  }

  function saveAnswers() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(answers)); }
    catch (e) { console.warn("Could not save local answers:", e); }
  }

  function clearAnswers() {
    answers = {};
    current = 0;
    try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
  }

  function countAnswered() {
    return Object.values(answers).filter(v => Number.isInteger(v) && v >= 1 && v <= 5).length;
  }

  function renderQuestion() {
    const q = questions[current];
    const info = traitInfo[q.trait];
    $("traitLabel").textContent = `${q.trait} · ${info.name.toUpperCase()}`;
    $("questionNumber").textContent = `ข้อ ${q.id} / ${questions.length}`;
    $("questionIndex").textContent = String(q.id).padStart(2, "0");
    $("questionText").textContent = q.text;
    $("answeredCount").textContent = `ตอบแล้ว ${countAnswered()}/${questions.length}`;
    $("progressBar").style.width = `${(countAnswered()/questions.length)*100}%`;
    $("prevBtn").disabled = current === 0;
    $("nextBtn").hidden = current === questions.length - 1;
    $("submitBtn").hidden = current !== questions.length - 1;
    $("validationBox").hidden = true;

    $("scaleOptions").innerHTML = [
      [1,"ไม่เห็นด้วยอย่างยิ่ง"],
      [2,"ไม่เห็นด้วย"],
      [3,"ไม่แน่ใจ / ปานกลาง"],
      [4,"เห็นด้วย"],
      [5,"เห็นด้วยอย่างยิ่ง"]
    ].map(([value,label]) => `
      <div class="scale-option">
        <input id="q${q.id}-${value}" type="radio" name="q${q.id}" value="${value}" ${answers[q.id] === value ? "checked" : ""}>
        <label for="q${q.id}-${value}"><span>${label}</span><span class="scale-number">${value}</span></label>
      </div>
    `).join("");

    $("scaleOptions").querySelectorAll("input").forEach(input => {
      input.addEventListener("change", e => {
        answers[q.id] = Number(e.target.value);
        saveAnswers();
        updateProgress();
      });
    });
  }

  function updateProgress() {
    $("answeredCount").textContent = `ตอบแล้ว ${countAnswered()}/${questions.length}`;
    $("progressBar").style.width = `${(countAnswered()/questions.length)*100}%`;
  }

  function validateAnswers() {
    const missing = [];
    for (const q of questions) {
      const value = answers[q.id];
      if (value === undefined || value === null || value === "" || !Number.isInteger(value) || value < 1 || value > 5) missing.push(q.id);
    }
    return missing;
  }

  function showValidation(missing) {
    const box = $("validationBox");
    if (!missing.length) { box.hidden = true; return; }
    box.innerHTML = `<strong>กรุณาตอบคำถามให้ครบทุกข้อก่อนดูผลลัพธ์</strong><br>คุณยังไม่ได้ตอบ ${missing.length} ข้อ${missing.length <= 8 ? ` (ข้อ ${missing.join(", ")})` : ""}`;
    box.hidden = false;
    const firstMissing = questions.findIndex(q => missing.includes(q.id));
    if (firstMissing >= 0) { current = firstMissing; renderQuestion(); box.hidden = false; }
  }

  function scoreTest() {
    validateQuestionBank();
    const missing = validateAnswers();
    if (missing.length) { showValidation(missing); return null; }

    const raw = Object.fromEntries(TRAITS.map(t => [t, 0]));
    const counts = Object.fromEntries(TRAITS.map(t => [t, 0]));

    for (const q of questions) {
      let value = answers[q.id];
      if (!Number.isInteger(value) || value < 1 || value > 5) throw new Error("Invalid answer value.");
      if (q.reverseScored) value = 6 - value;
      raw[q.trait] += value;
      counts[q.trait]++;
    }

    for (const t of TRAITS) {
      if (counts[t] !== 6 || raw[t] < 6 || raw[t] > 30) throw new Error("Score validation failed.");
    }

    const scores = {};
    for (const t of TRAITS) {
      const score = ((raw[t] - 6) / 24) * 100;
      if (!Number.isFinite(score) || score < 0 || score > 100) throw new Error("Normalized score validation failed.");
      scores[t] = Math.round(score);
    }
    return { raw, scores };
  }

  function level(score) {
    if (score <= 39) return "ค่อนข้างต่ำ";
    if (score <= 59) return "ระดับกลาง";
    return "ค่อนข้างสูง";
  }

  function joinThai(items) {
    if (items.length === 1) return traitInfo[items[0]].name;
    if (items.length === 2) return `${traitInfo[items[0]].name} และ ${traitInfo[items[1]].name}`;
    return items.slice(0,-1).map(t => traitInfo[t].name).join("، ") + ` และ ${traitInfo[items.at(-1)].name}`;
  }

  function analyze(scores) {
    const sorted = [...TRAITS].sort((a,b) => scores[b] - scores[a]);
    const max = scores[sorted[0]], min = scores[sorted.at(-1)];
    const highs = TRAITS.filter(t => scores[t] === max);
    const lows = TRAITS.filter(t => scores[t] === min);
    const mids = TRAITS.filter(t => scores[t] >= 40 && scores[t] <= 59);

    let summary = [];
    if (highs.length > 1) {
      summary.push(`จากคำตอบชุดนี้ แนวโน้มเด่นร่วมคือ ${joinThai(highs)} โดยมีคะแนน ${max}/100 เท่ากัน`);
    } else {
      summary.push(`จากคำตอบชุดนี้ แนวโน้มที่เด่นที่สุดคือ ${traitInfo[highs[0]].name} ที่ ${max}/100`);
    }
    if (lows.length > 1) summary.push(`ส่วนคะแนนต่ำสุดร่วมคือ ${joinThai(lows)} ที่ ${min}/100`);
    else summary.push(`คะแนนต่ำสุดอยู่ที่ ${traitInfo[lows[0]].name} ที่ ${min}/100`);
    if (mids.length) summary.push(`ด้านที่อยู่ในระดับกลางคือ ${joinThai(mids)}`);
    const close = sorted.filter((t,i) => i > 0 && Math.abs(scores[sorted[0]] - scores[t]) <= 3);
    if (close.length) summary.push("คะแนนของบางด้านอยู่ใกล้กัน จึงอาจสะท้อนแนวโน้มร่วมกันมากกว่าด้านใดด้านหนึ่งอย่างชัดเจน");

    return { sorted, highs, lows, summary, mids };
  }

  function renderResults(result) {
    const { raw, scores } = result;
    const analysis = analyze(scores);

    $("scoreGrid").innerHTML = TRAITS.map(t => `
      <div class="score-card">
        <div class="score-top"><span class="score-letter">${t}</span><span class="score-number">${scores[t]}</span></div>
        <h3>${traitInfo[t].name}</h3>
        <div class="mini-track"><div class="mini-fill" style="width:${scores[t]}%"></div></div>
        <div class="score-level">${level(scores[t])}</div>
      </div>
    `).join("");

    $("resultBars").innerHTML = TRAITS.map(t => `
      <div class="bar-row">
        <div class="bar-label"><span>${t} · ${traitInfo[t].name}</span><span>${scores[t]}/100</span></div>
        <div class="bar-track"><div class="bar-fill" style="width:${scores[t]}%"></div></div>
        <div class="bar-caption">${level(scores[t])} · คะแนนดิบ ${raw[t]}/30</div>
      </div>
    `).join("");

    $("summaryText").innerHTML = `<div class="summary-text">${analysis.summary.map(s => `<p>${s}</p>`).join("")}</div>`;
    $("extremes").innerHTML = `
      <span class="extreme">สูงสุด: ${joinThai(analysis.highs)}</span>
      <span class="extreme">ต่ำสุด: ${joinThai(analysis.lows)}</span>
    `;

    $("strengths").innerHTML = analysis.sorted.slice(0,3).map(t =>
      `<div class="bullet"><strong>${traitInfo[t].name} (${scores[t]})</strong> — ${traitInfo[t].strengths}</div>`
    ).join("");

    $("cautions").innerHTML = analysis.sorted.slice(-3).reverse().map(t =>
      `<div class="bullet"><strong>${traitInfo[t].name} (${scores[t]})</strong> — ${traitInfo[t].caution}</div>`
    ).join("");

    $("investmentInsights").innerHTML = TRAITS.map(t =>
      `<div class="insight"><strong>${t} · ${traitInfo[t].name}</strong>${traitInfo[t].investment}</div>`
    ).join("");
  }

  function handleSubmit() {
    if (processing) return;
    processing = true;
    $("submitBtn").disabled = true;
    $("submitBtn").textContent = "กำลังประมวลผล…";
    try {
      const result = scoreTest();
      if (!result) return;
      renderResults(result);
      showView("resultView");
    } catch (err) {
      console.error(err);
      $("errorMessage").textContent = "กรุณาลองทำแบบประเมินอีกครั้ง หากปัญหายังคงอยู่ กรุณา Refresh หน้าเว็บ";
      showView("errorView");
    } finally {
      processing = false;
      $("submitBtn").disabled = false;
      $("submitBtn").textContent = "ดูผลลัพธ์ →";
    }
  }

  function startTest(reset = false) {
    if (reset) clearAnswers();
    current = 0;
    showView("testView");
    renderQuestion();
  }

  function init() {
    try { validateQuestionBank(); } catch(e) { console.error(e); }
    answers = loadAnswers();

    $("traitIntro").innerHTML = TRAITS.map(t => `
      <article class="trait-card">
        <div class="trait-letter">${t}</div>
        <h3>${traitInfo[t].name}</h3>
        <p>${traitInfo[t].desc}</p>
      </article>
    `).join("");

    $("startBtn").addEventListener("click", () => startTest(false));
    $("retakeBtn").addEventListener("click", () => startTest(true));
    $("restartTop").addEventListener("click", () => startTest(true));
    $("errorRestart").addEventListener("click", () => startTest(true));
    $("prevBtn").addEventListener("click", () => {
      if (current > 0) { current--; renderQuestion(); }
    });
    $("nextBtn").addEventListener("click", () => {
      if (!answers[questions[current].id]) {
        $("validationBox").innerHTML = "<strong>กรุณาเลือกคำตอบก่อนดำเนินการต่อ</strong>";
        $("validationBox").hidden = false;
        return;
      }
      if (current < questions.length - 1) { current++; renderQuestion(); }
    });
    $("submitBtn").addEventListener("click", handleSubmit);
    document.querySelector('[data-action="home"]').addEventListener("click", e => {
      e.preventDefault();
      showView("homeView");
    });
  }

  init();
})();