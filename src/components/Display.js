export function Display({ filtered, media }) {
  return (
      <section className='section is-flex-wrap-wrap is-justify-content-space-between'>
        {filtered.map((entry,i) => 
          <div key={'item' + i}>
              <div>{media === 'works' ? entry.title : entry.name}</div>
          </div>
      )}
      </section>
    );
}