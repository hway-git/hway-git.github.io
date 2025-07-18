<script setup lang="ts">
import type ArticleProps from '~/types/article'
import Autoplay from 'embla-carousel-autoplay'
import emblaCarouselVue from 'embla-carousel-vue'

defineProps<{ list: ArticleProps[] }>()

const [emblaRef, emblaApi] = emblaCarouselVue({
    dragFree: true,
    loop: true,
}, [Autoplay({
    stopOnInteraction: false,
    stopOnMouseEnter: true,
})])
</script>

<template>
    <div class="z-slide">
        <div class="z-slide-title">
            <span class="title">精选文章</span>
            <div class="tip">
                <Icon name="ph:hand-grabbing-bold" />
                拖拽查看
            </div>
        </div>
        <div ref="emblaRef" class="embla">
            <div class="slide-list">
                <ZRawLink
                    v-for="(article, index) in list"
                    :key="index"
                    class="slide-item"
                    :title="article.description"
                    :to="article._path"
                >
                    <NuxtImg class="cover" :src="article.image" :alt="article.title" />
                    <div class="info">
                        <div>{{ article.title }}</div>
                        <div class="desc">
                            {{ getPostDate(article.date) }}
                        </div>
                    </div>
                </ZRawLink>
            </div>
            <ZButton
                class="embla-button prev"
                aria-label="上一页"
                icon="ph:caret-left-bold"
                @click="emblaApi?.scrollPrev()"
            />
            <ZButton
                class="embla-button next"
                aria-label="下一页"
                icon="ph:caret-right-bold"
                @click="emblaApi?.scrollNext()"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.z-slide {
    margin: 1rem;
}

.z-slide-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    overflow: hidden;
    height: 3rem;
    margin-bottom: -0.2rem;
    mask: linear-gradient(#fff, transparent);
    color: var(--c-text-3);
    flex-wrap: wrap;

    .title {
        font-size: 3rem;
        font-weight: var(--font-weight-bold);
        line-height: 1;
    }
}

.embla {
    --fadeout-width: 1.5rem;

    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    mask: linear-gradient(to right, transparent, #fff var(--fadeout-width), #fff calc(100% - var(--fadeout-width)), transparent);

    .embla-button {
        position: absolute;
        opacity: 0;
        padding: 0.5em 0.2em;
        font-size: 1.5em;
        transition: all 0.2s;
        &.prev { left: 1rem; }
        &.next { right: 1rem; }
    }

    &:hover {
        .embla-button {
            opacity: 1;
        }
    }
}

.slide-list {
    display: flex;
    scroll-snap-type: x mandatory;

    .slide-item {
        flex-shrink: 0;
        position: relative;
        overflow: hidden;
        width: max(12rem, 28%);
        max-width: 80%;
        aspect-ratio: 1.77;
        margin: 0 min(0.5em, 1%);
        border-radius: 0.5rem;
        scroll-snap-align: center;
        scroll-snap-stop: always;

        .cover {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            position: absolute;
            opacity: 0;
            inset: 0;
            padding: 1em;
            backdrop-filter: brightness(0.8) saturate(10) contrast(0.8) blur(2em);
            text-align: center;
            color: white;
            transition: opacity 0.2s;

            .desc {
                opacity: 0.5;
                font-size: 0.8em;
            }
        }

        &:hover > .info {
            opacity: 1;
        }
    }
}
</style>
