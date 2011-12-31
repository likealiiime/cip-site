kCollapsibleExampleCollapsedHeight = 200;

window.addEvent('domready', function() {
	$$('.collapsible.example').each(function(div) {
		var code = div.getFirst('p.codeblock');
		var header = div.getFirst('h2');
		var toggle = new Element('div', { 'class': 'toggle' });
		header.addEvent('click', function() {
			new Fx.Reveal(code, { duration: 350 }).toggle();
			div.toggleClass('expanded');
		});
		toggle.inject(header, 'top');
		new Fx.Reveal(code, { duration: 0 }).dissolve();
	});
	
	$$('p.codeblock').each(function(p) {
		var input = p.get('html');
		var lines = input.split("\n");
		lines.shift();
		var html = "";
		var tabsToEat = p.get('lang').toInt();
		var tabsRegex = new RegExp('^(\t{' + tabsToEat + ',})(.+?)$');
		lines = lines.map(function(line) {
			var result = tabsRegex.exec(line);
			if (result) {
				result.shift();
				var tabsToAdd = (result[0].split("\t").length - 1) - tabsToEat - 1;
				var line = '<span class="tab{n}">{tail}</span>'.substitute({
					n: tabsToAdd, tail: result[1]
				});
				line = line.replace(/\[\[/g, '&lsaquo;');
				line = line.replace(/\]\]/g, '&rsaquo;');
				if (p.hasClass('html')) {
					line = line.replace(/\(\(/g, '&lt;');
					line = line.replace(/\)\)/g, '&gt;');
				}
				return line;
			}
		});
		p.set('html', lines.join("<br/>"));
	});
});