export async function paginatedFind({
  model,
  where = {},
  query,
  include = [],
}) {
  const page = Number(query.page) > 0 ? Number(query.page) : 1;
  const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;
  const offset = (page - 1) * limit;

  // Sorting handling
  const sortBy = query.sortBy ?? 'id';
  const sortOrder = query.sortOrder?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  const order = [[sortBy, sortOrder]];

  const { rows, count } = await model.findAndCountAll({
    where,
    limit,
    offset,
    include,
    order,
  });

  return {
    page,
    limit,
    total: count,
    totalPages: Math.ceil(count / limit),
    list: rows,
  };
}
