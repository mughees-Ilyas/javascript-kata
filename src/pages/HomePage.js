import React, { useState, useEffect } from 'react';
import { Heading } from '../styled/Heading';
import { getAuthorData } from '../core/Redux/author/actions/author.actions';
import { connect } from 'react-redux'
import DataTable from '../components/DataTable';
import styled from 'styled-components';
import { rem } from 'polished';

const Page = styled.div`
  margin: 0 auto;
  padding: ${rem(16)};
  flex: 1;
  max-width: ${rem(1400)};
`;

function HomePage({ dispatch, data }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(getAuthorData());
  },[dispatch]);

  useEffect(() => {
    console.log(data);
    if(data) {
      setRows(data);
    }
  },[data]);

  return (
    <div>
      <Page>
        <Heading> Welcome to Advisor view </Heading>

        <DataTable title="Current Advisor Table"
          columns={
            [
              { label: 'Name',  prop: 'firstname' },
              { label: 'email',  prop: 'email' },

            ]
          }
          rows={Object.keys(rows).map((key) => [rows[key]][0])}
        />
      </Page>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    data: state.authorsReducer.data
  }
};

export default connect(mapStateToProps)(HomePage);
