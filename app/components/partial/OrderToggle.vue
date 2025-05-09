<script setup lang="ts">
// 当且仅当如此书写时，props.allowAscending 才能正确解析为 undefined
const props = withDefaults(defineProps<{
    allowAscending?: boolean | undefined
}>(), {
    allowAscending: undefined,
})
const appConfig = useAppConfig()
const orderMap = appConfig.article.order
const allowAscending = computed(() => props.allowAscending ?? appConfig.pagination.allowAscending)

const sortOrder = defineModel<keyof typeof orderMap>('sortOrder', { default: 'date' })
const isAscending = defineModel<boolean>('isAscending')

function toggleOrder() {
    const orderKeys = Object.keys(orderMap) as (keyof typeof orderMap)[]
    sortOrder.value = orderKeys[(orderKeys.indexOf(sortOrder.value) + 1) % orderKeys.length] || 'date'
}

function toggleDirection() {
    if (!allowAscending.value)
        return
    isAscending.value = !isAscending.value
}
</script>

<template>
    <div class="order-toggle">
        <button v-if="allowAscending" aria-label="切换排序方向" @click="toggleDirection">
            <Icon name="ph:sort-ascending-bold" class="toggle-direction" :class="{ ascending: isAscending }" />
        </button>

        <button @click="toggleOrder">
            <Icon v-if="!allowAscending" name="ph:sort-ascending-bold" />
            <span class="order-text">{{ orderMap[sortOrder] }}</span>
        </button>
    </div>
</template>

<style lang="scss" scoped>
.order-toggle {
    text-align: right;

    > button {
        color: var(--c-text-2);
        transition: color 0.2s;

        &:hover {
            color: var(--c-primary);
        }

        .iconify + span {
            margin-left: 0.1em;
        }
    }

    .toggle-direction {
        display: inline-block;
        margin-right: 0.1em;
        transition: transform 0.2s;

        &.ascending {
            transform: scaleY(-1);
        }
    }
}
</style>
