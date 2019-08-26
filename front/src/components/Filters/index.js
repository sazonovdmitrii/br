import React, { useState } from 'react';
import classnames from 'classnames/bind';

import { Tabs, Tab, TabsView } from 'components/Tabs';
import Checkbox from 'components/Checkbox';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Filters = ({ list }) => {
    const [{ value, active }, setState] = useState({
        value: null,
        active: false,
    });

    const handleChange = newValue => {
        console.log(newValue);

        setState(prevState => ({
            ...prevState,
            value: value === newValue ? null : newValue,
            active: value !== newValue,
        }));
    };

    const handleChangeFilter = () => {};

    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                {list.length ? (
                    <Tabs className={styles.tabs} value={value} onChange={handleChange}>
                        {list.map(item => {
                            if (!item.childrens.length) return null;
                            const tabClassName = cx(styles.tab, {
                                active: value === item.id,
                            });

                            return (
                                <Tab key={item.id} className={tabClassName} value={item.id}>
                                    {item.name}
                                </Tab>
                            );
                        })}
                    </Tabs>
                ) : null}
                {list.length
                    ? list.map(item => {
                          if (!item.childrens.length) return null;
                          const tabContentClassName = cx(styles.tabContent, {
                              active: item.id === value,
                          });

                          return (
                              <TabsView key={item.id} value={value} className={tabContentClassName}>
                                  {item.childrens.map(({ name, id }) => {
                                      if (!name) return null;

                                      return (
                                          <div key={id} className={styles.filterItem}>
                                              <Checkbox
                                                  label={name}
                                                  name={id}
                                                  onChange={handleChangeFilter}
                                              />
                                          </div>
                                      );
                                  })}
                              </TabsView>
                          );
                      })
                    : null}
            </div>
        </div>
    );
};

export default Filters;
