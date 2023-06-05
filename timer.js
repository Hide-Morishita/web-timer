window.addEventListener("DOMContentLoaded", () => {
  //free_timer
  const inputMin = document.getElementById("free-min")
  const inputSec = document.getElementById("free-sec")
  const freeStart = document.getElementById("free-start")
  const freeStop = document.getElementById("free-stop")
  const freeReset = document.getElementById("free-reset")
  const add10 = document.getElementById("min-10")
  const add5 = document.getElementById("min-5")
  const add1 = document.getElementById("min-1")
  const realTime = document.getElementById("real-time")
  const alarm = new Audio("music/alarm.mp3")

  // 再生位置を0に設定
  alarm.currentTime = 0;

  setInterval(()=>{
    realTime.textContent = new Date().toLocaleString();
  }, 100);

  // スタート、ストップ、リセットボタンの色切り替え
  const color = () => {
    freeStart.setAttribute("style", "color: #fff;")
    freeStop.setAttribute("style", "color: #b84c00;")
    freeReset.setAttribute("style", "color: #b84c00;")
  }

  // 時間追加のボタンを押せるようにするための記述
  const addTimeBtn = () => {
    add10.disabled = false;
    add5.disabled = false;
    add1.disabled = false;
  }

  // スタート、ストップ、リセットボタンの切り替え
  const timeBtn = () => {
    freeStart.disabled = false;
    freeStop.disabled = true;
    freeReset.disabled = true;
  }

  // 分、秒を入力できるようにする
  const inputField = () => {
    inputMin.disabled = false;
    inputSec.disabled = false;
  }

  // 値が入力されたら、リセットボタンを押せるようにする
  const resetBtn = () => {
    freeReset.disabled = false;
    freeReset.setAttribute("style", "color: #fff;");
  }

  // 時間追加ボタン(10分)
  add10.addEventListener("click", (e) => {
    e.preventDefault()
    add10.disabled = false;
    resetBtn();
    const setMin = add10.value
    if (inputMin.value == 0) {
      inputMin.value = setMin;
    } else {
      inputMin.value = parseInt(setMin) + parseInt(inputMin.value);
    }
  })

  // 時間追加ボタン(5分)
  add5.addEventListener("click", (e) => {
    e.preventDefault()
    add5.disabled = false;
    resetBtn();
    const setMin = add5.value
    if (inputMin.value == 0) {
      inputMin.value = setMin;
    } else {
      inputMin.value = parseInt(setMin) + parseInt(inputMin.value);
    }
  })

  // 時間追加ボタン(1分)
  add1.addEventListener("click", (e) => {
    e.preventDefault()
    add1.disabled = false;
    resetBtn();
    const setMin = add1.value
    if (inputMin.value == 0) {
      inputMin.value = setMin;
    } else {
      inputMin.value = parseInt(setMin) + parseInt(inputMin.value);
    }
  })

  // 60分以上を設定しようとした場合の処理
  inputMin.addEventListener("input", () => {
    const minValue = inputMin.value 
    resetBtn();
    if (minValue > 60) {
      alert(`${minValue}分は設定できません。\n60分以内で設定し直してください`)
      inputMin.value = ""
    }
  })
  
  // 59秒以上を設定しようとした場合の処理
  inputSec.addEventListener("input", () => {
    const secValue = inputSec.value 
    resetBtn();
    if (secValue > 59) {
      alert(`${secValue}秒は設定できません。\n0~59秒以内で設定し直してください`)
      inputSec.value = ""
    }
  })

  freeStart.addEventListener("click", () => {
    // スタートボタンを押したときの色の切り替え
    freeStart.setAttribute("style", "color: #b84c00;")
    freeStop.setAttribute("style", "color: #fff;")
    freeReset.setAttribute("style", "color: #b84c00;")

    // 入力された値が空だった場合の処理
    if (inputMin.value == "" && inputSec.value == "") {
      freeStop.disabled = true;
    } else if (inputMin.value == "") {
      inputMin.value = 0
    } else if (inputSec.value == "") {
      inputSec.value = 0
    }
    
    // 入力された値の計算(分、秒、合計)
    let countMin = parseInt(inputMin.value * 60)
    let countSec = parseInt(inputSec.value)
    let mixValue = countMin + countSec
    
    // スタートボタンを押した後の切り替え
    freeStart.disabled = true;
    freeStop.disabled = false;
    freeReset.disabled = true;
    inputMin.disabled = true;
    inputSec.disabled = true;    
    
    // 時間追加のボタンを押せないようにする
    add10.disabled = true;
    add5.disabled = true;
    add1.disabled = true;

    // カウントダウン処理
    const freeCount = () => {
      // ストップボタンを押したときの処理
      freeStop.addEventListener("click", () => {
        // スタートボタンを押したときの色の切り替え
        freeStart.setAttribute("style", "color: #fff;")
        freeStop.setAttribute("style", "color: #b84c00;")
        freeReset.setAttribute("style", "color: #fff;")
        freeStart.disabled = false;
        freeStop.disabled = true;
        freeReset.disabled = false;
        inputField();
        addTimeBtn();
        clearInterval(freeInterval)
      })

      // 60分以上の場合、カウントをストップ
      if (mixValue > 3600) {
        inputField();
        clearInterval(freeInterval)
      }
      
      if (mixValue < 0) {
        alarm.play()
        color()
        inputMin.value = ""
        inputSec.value = ""
        timeBtn();
        inputField();
        addTimeBtn();
        clearInterval(freeInterval);
        return;
      }else{
        freeMin = Math.floor(mixValue / 60);
        freeSec = Math.floor(mixValue % 60);
        mixValue -= 1;
      }
      
      // 10分以下の表示
      if (freeMin < 10 ) {
        inputMin.value = `0${freeMin}`
      } else {
        inputMin.value = freeMin
      }

      // 10秒以下の表示
      if (freeSec < 10 ) {
        inputSec.value = `0${freeSec}`
      } else {
        inputSec.value = freeSec
      }
    }

    const freeBlank = () => {
      alert("時間(半角数字)を入力してください！")
      color()
      inputMin.value = ""
      inputSec.value = ""
      timeBtn();
      inputField();
      addTimeBtn();
    }
    
    const freeInterval = setInterval(freeCount, 1000);
    
    // isNaNで引数の値がNaNであるか確認。NaNであった場合処理を止める。
    if (isNaN(mixValue) == true) {
      freeBlank()
      clearInterval(freeInterval)
    } else if (mixValue > 3600) {
      freeStart.disabled = false;
      freeStop.disabled = true;
      inputField();
      inputMin.value = ""
      inputSec.value = ""
      color();
      addTimeBtn();
      alert("60分以内で設定してください")
      clearInterval(freeInterval)
    } else {
      freeCount(mixValue)
    }
  })

  // リセットボタンを押した際の処理
  freeReset.addEventListener("click", () => {
    // リセットを押した後の色の切り替え
    freeReset.setAttribute("style", "color: #b84c00;")
    inputMin.value = "";
    inputSec.value = "";
    freeReset.disabled = true;
  })
})