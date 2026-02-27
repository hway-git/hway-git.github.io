<script setup lang="ts">
import {
    LazyWidgetBlogLog,
    LazyWidgetBlogStats,
    LazyWidgetEmpty,
    LazyWidgetGithubCard,
    LazyWidgetToc,
} from '#components'
import { pascal } from 'radash'

const layoutStore = useLayoutStore()

const widgetList = {
    LazyWidgetBlogLog,
    LazyWidgetBlogStats,
    LazyWidgetEmpty,
    LazyWidgetGithubCard,
    LazyWidgetToc,
}

const widgets = computed(() => (layoutStore.asideItems || []).map(componentAlias =>
    `LazyWidget${pascal(componentAlias)}` as keyof typeof widgetList),
)
</script>

<template>
    <Transition>
        <div v-if="layoutStore.isOpen('aside')" id="z-aside-bgmask" @click="layoutStore.toggle('aside')" />
    </Transition>
    <!-- 此处不能使用 Transition，因为宽屏状态始终显示 -->
    <!-- 如果为空数组则隐藏 -->
    <aside v-if="layoutStore.asideItems?.length" id="z-aside" class="scrollcheck-y" :class="{ show: layoutStore.isOpen('aside') }">
        <div class="container">
            <div v-for="widget in widgets" :key="widget" class="widget">
                <!-- 更换页面时通过 key 更新这些组件，防止旧数据导致问题 -->
                <component :is="widgetList[widget]" :key="$route.path" />
            </div>
        </div>
    </aside>
</template>

<style lang="scss" scoped>
#z-aside {
    overflow: auto;
    padding: 0.5rem 0.8rem;

    @media (max-width: $breakpoint-widescreen) {
        position: fixed;
        top: 0;
        right: -100%;
        width: 320px;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        padding: 0.5rem;
        transition: right 0.2s;
        z-index: 100;

        .container {
            padding: 0.5rem;
            border-radius: 1rem;
            background-color: var(--ld-bg-blur);
            backdrop-filter: blur(18px) saturate(150%);
            -webkit-backdrop-filter: blur(18px) saturate(150%);
        }

        &.show {
            right: 0;
        }
    }
}

#z-aside-bgmask {
    position: fixed;
    inset: 0;
    background-color: #0003;
    transition: opacity 0.2s;
    z-index: 100;

    &.v-enter-from,
    &.v-leave-to {
        opacity: 0;
    }

    @media (min-width: $breakpoint-widescreen) {
        display: none;
    }
}

// 对于标准 widget 的规范样式
:deep(.widget) {
    font-size: 0.9em;

    & + .widget {
        margin-top: 1rem;
    }

    > .widget-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        margin: 0.5rem;
        font: inherit;
        color: var(--c-text-2);

        > .title {
            flex-grow: 1;
        }

        a {
            transition: color 0.2s;
        }

        > [onclick]:hover, > [href]:hover {
            color: var(--c-primary);
        }
    }

    > .widget-card {
        padding: 0.35rem 0.9rem;
        border: 1px solid hsl(var(--hue-theme) 100% 100% / 18%);
        border-radius: 0.8rem;
        background-color: var(--ld-bg-card);
        box-shadow:
            inset 0 1px 0 hsl(var(--hue-theme) 100% 100% / 28%),
            0 6px 16px var(--ld-shadow);
        backdrop-filter: blur(12px) saturate(135%);
        -webkit-backdrop-filter: blur(12px) saturate(135%);
        transition: transform 0.18s ease, border-color 0.2s, background-color 0.2s, box-shadow 0.2s;

        &:hover {
            transform: translateY(-2px);
            border-color: hsl(var(--hue-theme) 100% 100% / 24%);
            background-color: var(--ld-bg-card);
            box-shadow:
                inset 0 1px 0 hsl(var(--hue-theme) 100% 100% / 34%),
                0 10px 22px var(--ld-shadow);
        }

        p, li {
            margin: 0.5em 0;
        }
    }
}
</style>
