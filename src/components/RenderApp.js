import { SignIn } from "./SignIn";

import { MediaTypeControls } from "./MediaTypeControls.js";
import { ListControls } from "./ListControls.js"
import { ViewControls } from "./ViewControls.js";
import { DateControls } from "./DateControls.js";
import { Tags } from "./Tags.js";

import { Display } from "./Display.js";

export const RenderApp = ({ userData, data, categories, displaySettings, utilities }) => {
    const { loading, currentListMetadata } = data;
    const renderDateControls = elementType => {
        const { dateRange } = displaySettings;
        const shortTimePeriod = utilities.dateRangeDefault.end - currentListMetadata.startYear < 100;
        const renderDateControl = range => (
          <DateControls
            data={data}
            categories={categories}
            displaySettings={displaySettings}
            utilities={utilities}
            elementType={elementType}
            range={range} 
          />
        )
        return (
        <>
          {!shortTimePeriod && renderDateControl(100)}
          {(dateRange.end - dateRange.start <= 100 || shortTimePeriod) && renderDateControl(10)}
          {dateRange.end - dateRange.start <= 10 && renderDateControl(1)}
        </>)
    };

    return (
        <>
          <div className='section pb-0'>
            <h1 className='title'>Get Cultured</h1>
            <h2 className='subtitle'>Explore selected lists of great works of art</h2>
          </div>
          { loading 
            ? (
              <div style={{height: '90vh'}} className='section is-flex is-justify-content-center is-align-items-center'>
                <p>Loading...</p>
              </div>
            )
            : (
            <>
              <section className='section pb-2'>
                <div className='mb-3'>
                  <SignIn userData={userData}/>
                </div>
                <div className='mb-3'>
                  <MediaTypeControls
                    data={data}
                    categories={categories}
                    displaySettings={displaySettings}
                    utilities={utilities}
                  />
                </div>
                <div className='mb-3'>
                  <ListControls 
                      data={data}
                      categories={categories}
                      utilities={utilities}
                  />
                </div>
                <div className='my-3'>
                  <ViewControls
                    data={data}
                    categories={categories}
                    displaySettings={displaySettings}
                    userData={userData}
                    utilities={utilities}
                  />
                </div>
                <div className='mt-4 mb-3'>
                  <div className='mobile-only field is-grouped'>
                    {renderDateControls('dropdown')}
                  </div>
                  <div className='desktop-only'>
                    {renderDateControls('buttons')}
                  </div>
                </div>
                <div className='my-3'>
                    <Tags
                        data={data}
                        categories={categories}
                        displaySettings={displaySettings}
                        utilities={utilities}
                    />
                </div>
              </section>
              <Display
                data={data}
                categories={categories}
                displaySettings={displaySettings}
                utilities={utilities}
                userData={userData}
              />
            </>
            )
          }
          
          <footer className='footer'>
            <div className='content has-text-centered'>
              <strong>Get Cultured</strong> by <a href="https://alexdietz.com/">Alex Dietz</a>.
              The favicon is from <a href="https://www.flaticon.com/free-icons/book" title="book icons">Freepik - Flaticon</a>.
            </div>
          </footer>
        </>)
}