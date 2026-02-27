<script setup lang="ts">
const appConfig = useAppConfig()
const colorMode = useColorMode()

const themes = appConfig.themes
type ThemeType = keyof typeof themes
const themeEntries = computed(
    () => Object.entries(themes) as [ThemeType, (typeof themes)[ThemeType]][],
)
const activeIndex = computed(() => {
    const index = themeEntries.value.findIndex(([themeName]) => themeName === colorMode.preference)
    return index >= 0 ? index : 0
})
const sliderStyle = computed(() => {
    const count = Math.max(themeEntries.value.length, 1)
    return {
        width: `calc((100% - (var(--toggle-pad) * 2) - (var(--toggle-gap) * ${count - 1})) / ${count})`,
        transform: `translateX(calc(${activeIndex.value} * (100% + var(--toggle-gap))))`,
    }
})

function toggleTheme(themeName: ThemeType) {
    colorMode.preference = themeName
}
</script>

<template>
    <div class="theme-toggle">
        <span class="theme-pill" :style="sliderStyle" />
        <button
            v-for="[themeName, themeData] in themeEntries"
            :key="themeName"
            v-tippy="themeData.tip"
            type="button"
            :aria-label="themeData.tip"
            :class="{ active: colorMode.preference === themeName }"
            @click="toggleTheme(themeName)"
        >
            <Icon :name="themeData.icon" />
        </button>
    </div>
</template>

<style lang="scss" scoped>
.theme-toggle {
    --toggle-pad: 0.3rem;
    --toggle-gap: 0.35rem;

    position: relative;
    display: flex;
    justify-content: center;
    gap: var(--toggle-gap);
    width: fit-content;
    margin: 0 auto;
    padding: var(--toggle-pad);
    border: 1px solid hsl(var(--hue-theme) 10% 100% / 45%);
    border-radius: 999px;
    background: var(--ld-bg-blur);
    box-shadow:
        inset 0 1px 0 hsl(var(--hue-theme) 100% 100% / 70%),
        inset 0 -1px 0 hsl(var(--hue-theme) 0% 0% / 8%),
        0 10px 30px hsl(var(--hue-theme) 30% 20% / 20%);
    backdrop-filter: blur(18px) saturate(160%);
    -webkit-backdrop-filter: blur(18px) saturate(160%);
    isolation: isolate;
    overflow: hidden;

    .theme-pill {
        position: absolute;
        top: var(--toggle-pad);
        left: var(--toggle-pad);
        height: calc(100% - (var(--toggle-pad) * 2));
        border-radius: 999px;
        background: var(--ld-bg-card);
        box-shadow:
            inset 0 1px 0 hsl(var(--hue-theme) 100% 100% / 68%),
            0 0 0 1px hsl(var(--hue-theme) 100% 100% / 32%),
            0 8px 22px var(--ld-shadow);
        transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), width 0.2s ease;
        pointer-events: none;
        z-index: 0;
    }

    > button {
        position: relative;
        z-index: 1;
        display: grid;
        place-items: center;
        min-width: 2.6rem;
        padding: 0.42rem 0.9rem;
        border-radius: 999px;
        color: var(--c-text-2);
        transition: transform 0.18s ease, box-shadow 0.22s ease, background-color 0.22s ease, color 0.22s ease;

        &::after {
            content: '';
            position: absolute;
            inset: 1px;
            border-radius: inherit;
            border: 1px solid hsl(var(--hue-theme) 100% 100% / 26%);
            opacity: 0;
            transition: opacity 0.2s ease;
            pointer-events: none;
        }

        &:hover {
            background-color: hsl(var(--hue-theme) 100% 100% / 20%);
            color: var(--c-text-1);
            box-shadow:
                inset 0 1px 0 hsl(var(--hue-theme) 100% 100% / 38%),
                0 6px 16px hsl(var(--hue-theme) 30% 20% / 14%);

            &::after {
                opacity: 1;
            }
        }

        &:active {
            transform: translateY(0) scale(0.98);
        }

        &.active {
            color: var(--c-text-1);
            cursor: auto;

            &:hover {
                transform: none;
                background-color: transparent;
                box-shadow: none;

                &::after {
                    opacity: 0;
                }
            }
        }
    }
}
</style>
