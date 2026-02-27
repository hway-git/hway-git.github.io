<script setup lang="ts">
const appConfig = useAppConfig()
const layoutStore = useLayoutStore()

const keycut = computed(() => navigator?.userAgent.includes('Mac OS') ? '⌘K' : 'Ctrl+K')
</script>

<template>
    <Transition>
        <!-- FIXME: 评估是否能公用 bgmask 减少冗余 -->
        <div v-if="layoutStore.isOpen('sidebar')" id="z-sidebar-bgmask" @click="layoutStore.toggle('sidebar')" />
    </Transition>
    <!-- 此处不能使用 Transition，因为半宽屏状态始终显示 -->
    <aside id="z-sidebar" :class="{ show: layoutStore.isOpen('sidebar') }">
        <ZHeader class="sidebar-header" to="/" />
        <nav class="sidebar-nav scrollcheck-y">
            <div class="search-btn sidebar-nav-item" @click="layoutStore.toggle('search')">
                <Icon name="ph:magnifying-glass-bold" />
                <span class="nav-text">搜索</span>
                <span class="keycut widescreen-only">{{ keycut }}</span>
            </div>
            <template v-for="(group, groupIndex) in appConfig.nav" :key="groupIndex">
                <h3 v-if="group.title">
                    {{ group.title }}
                </h3>
                <menu>
                    <li v-for="(item, itemIndex) in group.items" :key="itemIndex">
                        <ZRawLink :to="item.url" class="sidebar-nav-item">
                            <Icon :name="item.icon" />
                            <span class="nav-text">{{ item.text }}</span>
                            <Icon v-if="item?.external" class="external-tip" name="ph:arrow-up-right" />
                        </ZRawLink>
                    </li>
                </menu>
            </template>
        </nav>
        <footer class="sidebar-footer">
            <ThemeToggle />
            <ZIconNavList :list="appConfig.footer.iconNav" />
        </footer>
    </aside>
</template>

<style lang="scss" scoped>
#z-sidebar {
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(18px) saturate(150%);
    -webkit-backdrop-filter: blur(18px) saturate(150%);
    color: var(--c-text-2);
    transition: color 0.1s;

    @media (max-width: $breakpoint-mobile) {
        position: fixed;
        left: -100%;
        width: 320px;
        max-width: 100%;
        color: currentcolor;
        transition: left 0.2s, color 0.1s;
        z-index: 100;

        &.show {
            left: 0;
        }
    }
}

#z-sidebar-bgmask {
    position: fixed;
    inset: 0;
    background-color: #0003;
    transition: opacity 0.2s;
    z-index: 100;

    &.v-enter-from,
    &.v-leave-to {
        opacity: 0;
    }

    @media (min-width: $breakpoint-mobile) {
        display: none;
    }
}

.sidebar-nav {
    flex-grow: 1;
    top: 0;
    padding: 0 4.5%;
    font-size: 0.9em;

    h3 {
        margin: 2em 0 1em 1em;
        font: inherit;
        color: var(--c-text-2);
    }

    li {
        margin: 0.5em 0;
    }
}

.sidebar-nav-item {
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.5em 1em;
    border: 1px solid transparent;
    border-radius: 0.75em;
    transition: transform 0.18s ease, box-shadow 0.22s ease, background-color 0.22s ease, color 0.22s ease, border-color 0.22s ease;

    &:hover {
        transform: translateY(-1px);
        border-color: hsl(var(--hue-theme) 100% 100% / 18%);
        background-color: var(--c-bg-a50);
        box-shadow: inset 0 1px 0 hsl(var(--hue-theme) 100% 100% / 24%);
        color: var(--c-text);
    }

    &.router-link-active {
        border-color: hsl(var(--hue-theme) 100% 100% / 28%);
        background-color: var(--ld-bg-card);
        box-shadow:
            inset 0 1px 0 hsl(var(--hue-theme) 100% 100% / 34%),
            0 6px 16px hsl(var(--hue-theme) 30% 20% / 12%);
        color: var(--c-text);
    }

    &.router-link-active::after {
        content: "⦁";
        width: 1em;
        text-align: center;
        color: var(--c-text-3);
    }

    .iconify {
        font-size: 1.5em;
    }

    .nav-text {
        flex-grow: 1;
    }

    .external-tip {
        opacity: 0.5;
        font-size: 1em;
    }
}

.search-btn {
    margin-block: 1rem;
    border-color: hsl(var(--hue-theme) 100% 100% / 26%);
    background-color: var(--c-bg-a50);
    box-shadow: inset 0 1px 0 hsl(var(--hue-theme) 100% 100% / 26%);
    cursor: text;

    &:hover {
        border-color: hsl(var(--hue-theme) 100% 100% / 32%);
    }

    .keycut {
        opacity: 0.5;
        padding: 0 0.2em;
        border-radius: 0.2em;
        background-color: var(--c-bg-soft);
        font-size: 0.8em;
    }
}

.sidebar-footer {
    margin: 0.2rem 0.5rem 0.5rem;
    padding-top: 0.4rem;
    border-top: 1px solid hsl(var(--hue-theme) 100% 100% / 14%);
    font-size: 0.8em;
    text-align: center;
    color: var(--c-text-2);

    > * {
        margin-block: clamp(0.5rem, 3vh, 1rem);
    }
}
</style>
