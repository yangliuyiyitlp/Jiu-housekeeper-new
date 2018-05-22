<template>
  	<div class="ly-main-content ">
			<div class="ly-menu">
				<left-menu />
			</div>
  		<div class="ly-page-container">
        <div>
          <slot />
        </div>
  		</div>
  	</div>
</template>

<script>
export default {
	name: 'layout-body'	
}
</script>
