<script setup>
import { nodeTextContent } from '@nuxtjs/mdc/runtime/utils/node'

const el = ref(null)
const rendered = ref(false)
const rerenderCounter = ref(1)
const slots = useSlots()
const { $mermaid } = useNuxtApp()

const colorMode = useColorMode()
const currentTheme = computed(() => colorMode.value === 'dark' ? 'dark' : 'default')

const mermaidSyntax = computed(() => {
    // Trick to force re-render when the slot content changes (for preview inside studio)
    rerenderCounter.value

    const defaultSlot = slots.default?.()[0]
    if (!defaultSlot) {
        return ''
    }

    // Old syntax with text node
    if (typeof defaultSlot.children === 'string') {
        return defaultSlot.children
    }

    // New syntax with code node
    const codeChild = defaultSlot.children?.default()[0]
    if (codeChild.type !== 'code') {
        return ''
    }

    // New syntax without highlight
    if (typeof codeChild.children === 'string') {
        return codeChild.children
    }

    // New syntax with highlight
    return nodeTextContent(codeChild.children)
})

watch(currentTheme, (theme) => {
    $mermaid.initialize({
        startOnLoad: false,
        deterministicIds: true,
        theme,
    })
    rendered.value = false
    nextTick(render)
})

async function render() {
    if (!el.value) {
        return
    }
    // // Iterate children to remove comments
    for (const child of el.value.childNodes) {
        if (child.nodeType === Node.COMMENT_NODE) {
            el.value.removeChild(child)
        }
    }

    rendered.value = true
    if ($mermaid && mermaidSyntax.value) {
        const id = useStableMermaidId(mermaidSyntax.value)
        const result = await $mermaid.render(id, mermaidSyntax.value, el.value)
        el.value.innerHTML = result.svg
    }
}

onBeforeUpdate(() => {
    rerenderCounter.value++
})

onMounted(() => {
    $mermaid.initialize({
        startOnLoad: false,
        deterministicIds: true,
        theme: currentTheme.value,
    })
    render()
})
</script>

<template>
    <!-- Keep this to fetch `default` slot in metadata -->
    <slot v-if="false" />
    <pre ref="el" :style="{ display: rendered ? 'block' : 'none' }" class="not-prose">
    {{ mermaidSyntax }}
  </pre>
</template>
