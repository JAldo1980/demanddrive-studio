import { Link, useParams } from 'react-router'
import { FinalCta } from '../components/sections/FinalCta'
import { ArrowRight } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { site } from '../config/site'
import { formatDate, getPost, posts } from '../content/posts'
import NotFound from './NotFound'

export default function InsightPost() {
  const { slug } = useParams()
  const post = getPost(slug)
  if (!post) return <NotFound />

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2)
  const linkedIn = site.social.find((s) => s.label === 'LinkedIn')

  return (
    <>
      <article aria-labelledby="page-title">
        <header className="border-b border-line bg-white">
          <Container className="pt-10 pb-12 sm:pt-12 lg:pt-16 lg:pb-14">
            <div className="mx-auto max-w-3xl">
              <nav aria-label="Breadcrumb" className="text-sm text-muted">
                <Link to="/insights" className="hover:text-electric">
                  Insights
                </Link>
              </nav>
              <h1 id="page-title" className="mt-6 text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">{post.description}</p>
              <div className="mt-8 flex items-center gap-4">
                <img
                  src={site.founder.headshot}
                  alt=""
                  width={48}
                  height={47}
                  className="size-12 rounded-full bg-cool object-cover"
                />
                <p className="text-sm leading-snug">
                  <span className="block font-semibold text-navy">{site.founder.name}</span>
                  <span className="text-muted">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.updated && post.updated !== post.date && (
                      <>
                        {' · Updated '}
                        <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                      </>
                    )}
                    {' · '}
                    {post.readingMinutes} min read
                  </span>
                </p>
              </div>
            </div>
          </Container>
        </header>

        <Container className="py-12 sm:py-16">
          {post.image && (
            <figure className="mx-auto mb-10 max-w-3xl">
              <img
                src={post.image}
                alt={post.imageAlt ?? ''}
                width={1200}
                height={630}
                className="aspect-[40/21] w-full rounded-2xl bg-cool object-cover"
              />
            </figure>
          )}

          <div className="prose-article mx-auto max-w-3xl" dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.faqs && post.faqs.length > 0 && (
            <section aria-labelledby="post-faqs" className="mx-auto mt-12 max-w-3xl">
              <h2 id="post-faqs" className="text-2xl font-bold tracking-tight text-navy">
                Common questions
              </h2>
              <dl className="mt-6 divide-y divide-line border-y border-line">
                {post.faqs.map((f) => (
                  <div key={f.question} className="py-5">
                    <dt className="font-semibold text-navy">{f.question}</dt>
                    <dd className="mt-2 leading-relaxed text-muted">{f.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <aside aria-label="About the author" className="mx-auto mt-14 flex max-w-3xl flex-col gap-5 rounded-2xl bg-cool p-6 sm:flex-row sm:items-center sm:p-8">
            <img
              src={site.founder.headshot}
              alt=""
              width={80}
              height={79}
              loading="lazy"
              className="size-20 shrink-0 rounded-full bg-white object-cover"
            />
            <div>
              <p className="font-semibold text-navy">Written by {site.founder.name}</p>
              <p className="mt-1 leading-relaxed text-muted">
                B2B marketer, former agency co-founder and developer, helping UK B2B businesses turn marketing into
                enquiries and pipeline.{' '}
                <Link to="/about" className="font-medium text-electric underline-offset-2 hover:underline">
                  More about me
                </Link>
                {linkedIn && (
                  <>
                    {' · '}
                    <a href={linkedIn.href} target="_blank" rel="me noopener" className="font-medium text-electric underline-offset-2 hover:underline">
                      LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </>
                )}
              </p>
            </div>
          </aside>
        </Container>
      </article>

      {more.length > 0 && (
        <section aria-labelledby="more-title" className="border-t border-line bg-white">
          <Container className="py-12">
            <h2 id="more-title" className="text-sm font-semibold text-muted">
              More insights
            </h2>
            <ul className="mt-4 divide-y divide-line">
              {more.map((p) => (
                <li key={p.slug}>
                  <Link to={`/insights/${p.slug}`} className="group flex items-center justify-between gap-6 py-4">
                    <span className="text-lg font-semibold text-navy group-hover:text-electric">{p.title}</span>
                    <ArrowRight className="size-5 shrink-0 text-electric" />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <FinalCta />
    </>
  )
}
