<script setup lang="ts">
const appConfig = useAppConfig()
useSeoMeta({
    title: '专栏',
    description: `${appConfig.title}的所有专栏。`,
})

// 获取专栏数据
const { data: columns } = await useAsyncData(
    'columns_index',
    () => queryContent('columns')
        .only(['path', 'title', 'description', 'image', 'date', 'tags', 'articleCount', 'updated'])
        .find(),
    { default: () => [] },
)
</script>

<template>
    <div class="column">
        <div class="column-container">
            <ZColumn
                v-for="column in columns"
                :key="column.path"
                v-bind="column"
                :to="column.path"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.column {
    margin: 1rem;
}

.column-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
}
</style>