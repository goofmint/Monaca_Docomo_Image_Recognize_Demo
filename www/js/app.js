// docomo Developer supportで得られるAPIキーを設定します
const apiKey = 'OUR_API_KEY';
// 画像認識APIのURLを指定します
const URL = `https://api.apigw.smt.docomo.ne.jp/imageRecognition/v1/recognize?APIKEY=${apiKey}&recog=product-all&numOfCandidates=1`;

ons.ready(function() {
  // 最初は結果を表示しないようにします
  $('#productResult').hide();
  
  // ファイルが選択されたら処理を開始します
  $('#file').on('change', function(e) {
    // FileReaderを使って、選択されたファイルの内容を読み込みます
    var reader = new FileReader();
    // 読み込まれた後の処理です
    reader.onload = function(event) {
      // docomoの画像認識APIを呼び出します
      // ファイルの内容をそのまま適用します
      const data = event.target.result;
      $.ajax({
        type: 'POST',
        url: URL,
        contentType: 'application/octet-stream',
        processData: false,
        data: data
      })
      .then(function(res) {
        // 結果が得られたら表示処理を行います
        const obj = res.candidates[0];
        $('#productImage').attr('src', obj.imageUrl);
        $('#productName').text(obj.detail.itemName);
        $('#productCategory').text(obj.category);
        $('#productTitle').text(obj.sites[0].title);
        $('#productUrl').attr('href', obj.sites[0].url);
        // 最後に結果を表示します
        $('#productResult').show();
      });
    };
    // ファイルの読み込みを開始します
    reader.readAsArrayBuffer(e.target.files[0]);
  });
});
