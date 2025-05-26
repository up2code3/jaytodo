const preventRefresh = (e) => {
e.preventDefault();
}

const TodosViewForm = ({sortDirection,setSortDirection,setSortField,sortField,queryString,setQueryString}) => {
  return (
    <form onSubmit={preventRefresh}>
        <div>
            <label>Search Todos</label>
            <input
            type="text"
            value={queryString}
            onChange={(e) => {setQueryString(e.target.value)}}
            ></input>
            <button type="button" onClick={() => {setQueryString("")}}>Clear</button>
        </div>
      <div>

        <label htmlFor="sortField">Sort By</label>
        <select 
        id="sortField"
        onChange={(e) => setSortField(e.target.value)}
        value={sortField}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time created</option>
        </select>

        <label htmlFor="direction">Direction</label>
        <select 
        id="direction"
              onChange={(e) => setSortDirection(e.target.value)} 
              value={sortDirection}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

      </div>
    </form>
  );
};


export default TodosViewForm