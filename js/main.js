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
  //Actions on slide change:
  Reveal.addEventListener('slidechanged', function(){
    //Cleanup
    paper.clear();
    $('iframe').remove();
    //New iframes?
    var t = $('section.present[data-iframe]');
    if(t.length > 0){
      var i = t.data('iframe');
      t.prepend('<iframe scrolling="no" src="'+i+'"></iframe>');
      i = t.find('iframe');
      t.css('top', i.height()/-2 - 50 + 'px');
    }
  });
  //Unicorn magic!
  Reveal.addEventListener('done', function(){
    window.setTimeout(function(){
      /*
        Unicorn built using inkscape after the preimage
        from http://www.geekytattoos.com/does-she-dream-of-electric-sheep-too/
        simplified by hand for alottafun…
      */
      var uPath = 'M6,0L8,14L7,15L3,21L1,19L0,20L2,23L5,24L8,19L9,20L11,18L13,20L14,19L20,19L26,11L22,13L24,4L16,13L14,12Z'
                + 'M0,26L2,23L3,21'
                + 'M7,15L11,18L12,11'
                + 'M8,14L12,11L14,12'
                + 'M11,18L14,14L13,20'
                + 'M18,19L21,15L22,13'
                + 'M16,13L20,14L14,19'
                + 'M8,19L9,16.5'
                + 'M16.25,17.25L13.75,15'
                + 'M22.5,11L18.75,10'
        , unicorn = paper.path(uPath, 50, 50)
                     .attr({stroke: Raphael.getColor(), 'stroke-width': 2.5})
                     .transform('s8,-8');
      var bbox = unicorn.getBBox();
      unicorn.transform(Raphael.format('t{0},{1}s8,-8', w-bbox.width, h-bbox.height));
      window.setInterval(function(){
        unicorn.attr('stroke', Raphael.getColor());
      },500);
    },  200);
  });
});
