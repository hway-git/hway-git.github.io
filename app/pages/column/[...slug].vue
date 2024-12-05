<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData(
    `column-${route.params.slug.join('/')}`,
    () => queryContent('columns', ...route.params.slug).findOne(),
)

if (!data.value) {
    throw createError({
        statusCode: 404,
        message: '专栏不存在',
    })
}

useSeoMeta({
    title: data.value.title,
    description: data.value.description,
})
</script>

<template>
    <article class="column-detail">
        <header>
            <h1>{{ data.title }}</h1>
            <p class="description">{{ data.description }}</p>
        </header>
        <ContentRenderer :value="data" />
    </article>
</template>

<style lang="scss" scoped>
.column-detail {
    margin: 1rem;
    
    header {
        margin-bottom: 2rem;
        
        h1 {
            font-size: 2em;
            margin-bottom: 1rem;
        }
        
        .description {
            color: var(--c-text-2);
        }
    }
}
</style> 