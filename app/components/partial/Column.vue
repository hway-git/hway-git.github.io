<script setup lang="ts">
import type { ColumnProps } from '~/types/column'

const props = defineProps<{
    to?: string
} & ColumnProps>()

const appConfig = useAppConfig()

const categoryLabel = props.tags?.[0]
const categoryColor = appConfig.article.categories[categoryLabel!]?.color
const categoryIcon = appConfig.article.categories[categoryLabel!]?.icon
</script>

<template>
    <ZRawLink class="column-card card" :to="to">
        <NuxtImg v-if="image" class="column-cover" :src="image" :alt="title" />
        <article>
            <h2 class="column-title">
                {{ title }}
            </h2>
            <p class="column-description">
                {{ description }}
            </p>
            <div class="column-info">
                <time
                    :datetime="date"
                    :title="getLocaleDatetime(date)"
                >
                    <Icon name="ph:calendar-dots-bold" />
                    {{ getPostDate(date) }}
                </time>
                <time
                    v-if="updated"
                    :datetime="updated"
                    :title="getLocaleDatetime(updated)"
                >
                    <Icon name="ph:calendar-plus-bold" />
                    {{ getPostDate(updated) }}
                </time>
                <span class="column-count">
                    <Icon name="ph:article-bold" />
                    {{ articleCount }}篇文章
                </span>
                <span
                    v-if="categoryLabel"
                    class="column-category"
                    :style="{ '--cg-color': categoryColor }"
                >
                    <Icon :name="categoryIcon" />
                    {{ categoryLabel }}
                </span>
            </div>
        </article>
    </ZRawLink>
</template>

<style lang="scss" scoped>
.column-card {
    container-type: inline-size;
    display: block;
    position: relative;
    margin: 1rem 0;
    border-radius: 0.8rem;
    color: var(--c-text);
    width: calc(50% - 1rem);

    &:hover {
        .column-cover {
            opacity: 1;
        }
    }

    > article {
        padding: 0.5rem 1rem;

        > * {
            margin: 0.7rem 0;
        }
    }

    @media (max-width: 768px) {
        width: 100%;
    }
}

.column-info {
    display: flex;
    gap: 0.5em clamp(1em, 5%, 1.5em);
    font-size: 0.8em;
    flex-wrap: wrap;
    color: var(--c-text-2);

    &:empty {
        display: none;
    }
}

.column-title {
    font-size: 1.2em;
    font-weight: var(--font-weight-normal);
    color: var(--c-text);
}

.column-description {
    font-size: 0.9em;
    color: var(--c-text-2);
}

.column-category {
    color: var(--cg-color);
}

.column-cover {
    position: absolute;
    opacity: 0.8;
    top: 0;
    right: 0;
    width: min(320px, 50%);
    height: 100%;
    margin: 0;
    mask: linear-gradient(to right, transparent, #fff 50%);
    transition: all 0.2s;
    object-fit: cover;

    & + * {
        position: relative;
        width: 60%;
        text-shadow: 0 0 0.5rem var(--ld-bg-card), 0 0 1rem var(--ld-bg-card);
    }

    @mixin cover-narrow {
        position: initial;
        width: 100%;
        height: auto;
        max-width: none;
        max-height: 256px;
        aspect-ratio: 2.4;
        margin-bottom: -10%;
        mask: linear-gradient(#fff 50%, transparent);

        & + * {
            width: auto;
        }
    }

    @media (max-width: 768px) {
        @include cover-narrow;
    }

    @container (max-width: 768px) {
        @include cover-narrow;
    }
}
</style>