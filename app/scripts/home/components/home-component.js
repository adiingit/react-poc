var home = React.createClass({
	render:function(){
		<div class="navbar-header">
        <button class="navbar-toggle" type="button" data-ng-click="isCollapsed = !isCollapsed">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a data-ui-sref="home" class="navbar-brand" data-ui-sref-active="active">QA Metrix</a>
    	</div>
	}
});