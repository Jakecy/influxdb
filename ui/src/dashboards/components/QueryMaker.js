import React, {PropTypes} from 'react'

import QueryBuilder from 'src/data_explorer/components/QueryBuilder'
import QueryTabList from 'src/dashboards/components/QueryTabList'
import EmptyQuery from 'src/dashboards/components/EmptyQuery'

const {arrayOf, bool, func, node, number, shape, string} = PropTypes

const QueryMaker = React.createClass({
  propTypes: {
    source: shape({
      links: shape({
        queries: string.isRequired,
      }).isRequired,
    }).isRequired,
    queries: arrayOf(shape({})).isRequired,
    timeRange: shape({
      upper: string,
      lower: string,
    }).isRequired,
    templates: arrayOf(
      shape({
        tempVar: string.isRequired,
      })
    ),
    isInDataExplorer: bool,
    actions: shape({
      chooseNamespace: func.isRequired,
      chooseMeasurement: func.isRequired,
      chooseTag: func.isRequired,
      groupByTag: func.isRequired,
      addQuery: func.isRequired,
      toggleField: func.isRequired,
      groupByTime: func.isRequired,
      toggleTagAcceptance: func.isRequired,
      applyFuncsToField: func.isRequired,
      editRawTextAsync: func.isRequired,
    }).isRequired,
    setActiveQueryIndex: func.isRequired,
    onDeleteQuery: func.isRequired,
    activeQueryIndex: number,
    children: node,
    layout: string,
  },

  handleAddQuery() {
    const newIndex = this.props.queries.length
    this.props.actions.addQuery()
    this.props.setActiveQueryIndex(newIndex)
  },

  handleAddRawQuery() {
    const newIndex = this.props.queries.length
    this.props.actions.addQuery({rawText: ''})
    this.props.setActiveQueryIndex(newIndex)
  },

  getActiveQuery() {
    const {queries, activeQueryIndex} = this.props
    const activeQuery = queries[activeQueryIndex]
    const defaultQuery = queries[0]

    return activeQuery || defaultQuery
  },

  render() {
    const {
      layout,
      source,
      actions,
      queries,
      timeRange,
      templates,
      onDeleteQuery,
      activeQueryIndex,
      setActiveQueryIndex,
    } = this.props

    const query = this.getActiveQuery()

    return (
      <div className="query-maker query-maker--panel">
        <QueryTabList
          queries={queries}
          timeRange={timeRange}
          onAddQuery={this.handleAddQuery}
          onDeleteQuery={onDeleteQuery}
          activeQueryIndex={activeQueryIndex}
          setActiveQueryIndex={setActiveQueryIndex}
        />
        {query
          ? <QueryBuilder
              query={query}
              layout={layout}
              source={source}
              actions={actions}
              timeRange={timeRange}
              templates={templates}
              onAddQuery={this.handleAddQuery}
            />
          : <EmptyQuery onAddQuery={this.handleAddQuery} />}
      </div>
    )
  },
})

QueryMaker.defaultProps = {
  layout: 'default',
}

export default QueryMaker
