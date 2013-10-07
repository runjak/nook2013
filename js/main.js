$(function(){
  //Building the paper:
  var w = $(window).width()
    , h = $(window).height()
    , paper = Raphael(10, 10, w-20, h-20);
  //Finding code blocks:
  $('code[data-paper]').each(function(){
    var t = '<pre class="language-javascript">'
          + '<code data-trim contenteditable>'
          + $(this).text().trim()
          + '</code></pre>'
          + '<a class="runLink">Run!</a>';
    $(this).html(t);
    hljs.highlightBlock($(this).find('pre code').get(0));
  });
  //Executing the code :)
  $('a.runLink').click(function(e){
    e.preventDefault();
    var c = $(this).parent().find('code').text();
    eval('window.callback = function(paper){' + c + '};');
    paper.clear();
    window.callback(paper);
  });
  //Cleaning the paper on slide change:
  Reveal.addEventListener('slidechanged', function(){
    paper.clear();
  });
});
