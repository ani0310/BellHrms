import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/sidebar/${name}.svg`} sx={{ width: 0.8, height: 0.8 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),

  g_dashboard: icon('dashboard'),
  g_employeeManagement: icon('employeeManagement'),
  g_leaveManagement: icon('leaveManagement'),
  g_timesheetManagement: icon('timesheetManagement'),
  g_shiftManagement: icon('shiftManagement'),
  g_claims: icon('claims'),
  g_payroll: icon('payroll'),
  g_itDeclarations: icon('itDeclarations'),
  g_monthlyAdditionalDeductions: icon('monthlyAdditionalDeductions'),
  g_appraisal: icon('appraisal'),
  g_configurations: icon('configurations'),

  g_assets: icon('assets'),
  g_factory: icon('factory'),
  g_vendor: icon('vendor'),
  g_materials: icon('materials'),
  g_products: icon('products'),
  g_customers: icon('customers'),
  g_purchases: icon('purchases'),
  g_balanceSheet: icon('balanceSheet'),
  g_expenses: icon('expenses'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('HRMS'),
        items: [
          {
            title: t('Dashboard'),
            path: paths.dashboard.root,
            icon: ICONS.g_dashboard,
          },
          // {
          //   title: t('signup'),
          //   path: paths.dashboard.general.signup,
          //   icon: ICONS.ecommerce,
          // },
          // {
          //   title: t('table'),
          //   path: paths.dashboard.table.root,
          //   icon: ICONS.dashboard,
          // },

          {
            title: t('Employee Management'),
            path: paths.dashboard.employee.root,
            icon: ICONS.g_employeeManagement,
          },
          {
            title: t('Leave Management'),
            path: paths.dashboard.leave.root,
            icon: ICONS.g_leaveManagement,
          },
          {
            title: t('Time Sheet Management'),
            path: paths.dashboard.timesheet.root,
            icon: ICONS.g_timesheetManagement,
          },
          {
            title: t('Shift Management'),
            path: paths.dashboard.Shift.root,
            icon: ICONS.g_shiftManagement,
          },
          {
            title: t('Claims'),
            path: paths.dashboard.claims.root,
            icon: ICONS.g_claims,
            // children: [
            //   {
            //     title: t('profile'),
            //   path: paths.dashboard.claims.compoffapprove },

            // ],
          },
          {
            title: t('Payroll'),
            path: paths.dashboard.payroll.root,
            icon: ICONS.g_payroll,
          },
          {
            title: t('IT Declaration'),
            path: paths.dashboard.itdeclaration.root,
            icon: ICONS.g_itDeclarations,
          },
          {
            title: t('Monthly Additional Deductions'),
            path: paths.dashboard.monthlydeductions.root,
            icon: ICONS.g_monthlyAdditionalDeductions,
          },
          {
            title: t('Appraisal Management'),
            path: paths.dashboard.appraisal.root,
            icon: ICONS.g_appraisal,
          },
          {
            title: t('configurations'),
            path: paths.dashboard.configurations.root,
            icon: ICONS.g_configurations,
            children: [
              {
                title: t('Leave Configuration'),
                path: paths.dashboard.configurations.leaveconfiguration,
              },
              {
                title: t('Compoff Configuration'),
                path: paths.dashboard.configurations.compoffconfiguration,
              },
              {
                title: t('Appraisal Configuration'),
                path: paths.dashboard.configurations.appraisalconfiguration,
              },
              {
                title: t('Expense Claim Configuration'),
                path: paths.dashboard.configurations.expenseclaimconfiguration,
              },
              {
                title: t('Shift Configuration'),
                path: paths.dashboard.configurations.shiftconfiguration,
              },
              {
                title: t('Role Configuration'),
                path: paths.dashboard.configurations.roleconfiguration,
              },
            ],
          },
          // {
          //   title: t('Configuration'),
          //   path: paths.dashboard.employee.root,
          //   icon: ICONS.user,
          //   children: [
          //     { title: t('profile'), path: paths.dashboard.user.root },
          //     { title: t('cards'), path: paths.dashboard.user.cards },
          //     { title: t('list'), path: paths.dashboard.user.list },

          //   ],

          // },

          // {
          //   title: t('ecommerce'),
          //   path: paths.dashboard.general.ecommerce,
          //   icon: ICONS.ecommerce,
          // },
          // {
          //   title: t('analytics'),
          //   path: paths.dashboard.general.analytics,
          //   icon: ICONS.analytics,
          // },
          // {
          //   title: t('banking'),
          //   path: paths.dashboard.general.banking,
          //   icon: ICONS.banking,
          // },
          // {
          //   title: t('booking'),
          //   path: paths.dashboard.general.booking,
          //   icon: ICONS.booking,
          // },
          // {
          //   title: t('file'),
          //   path: paths.dashboard.general.file,
          //   icon: ICONS.file,
          // },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      // {
      //   subheader: t('management'),
      //   items: [
      //     // USER
      //     {
      //       title: t('user'),
      //       path: paths.dashboard.user.root,
      //       icon: ICONS.user,
      //       children: [
      //         { title: t('profile'), path: paths.dashboard.user.root },
      //         { title: t('cards'), path: paths.dashboard.user.cards },
      //         { title: t('list'), path: paths.dashboard.user.list },
      //         { title: t('create'), path: paths.dashboard.user.new },
      //         { title: t('edit'), path: paths.dashboard.user.demo.edit },
      //         { title: t('account'), path: paths.dashboard.user.account },
      //       ],
      //     },
      //     // ORDER
      //     {
      //       title: t('order'),
      //       path: paths.dashboard.order.root,
      //       icon: ICONS.order,
      //       children: [
      //         { title: t('list'), path: paths.dashboard.order.root },
      //         { title: t('details'), path: paths.dashboard.order.demo.details },
      //       ],
      //     },

      //     // PRODUCT
      //     // {
      //     //   title: t('product'),
      //     //   path: paths.dashboard.product.root,
      //     //   icon: ICONS.product,
      //     //   children: [
      //     //     { title: t('list'), path: paths.dashboard.product.root },
      //     //     {
      //     //       title: t('details'),
      //     //       path: paths.dashboard.product.demo.details,
      //     //     },
      //     //     { title: t('create'), path: paths.dashboard.product.new },
      //     //     { title: t('edit'), path: paths.dashboard.product.demo.edit },
      //     //   ],
      //     // },

      //     // INVOICE
      //     // {
      //     //   title: t('invoice'),
      //     //   path: paths.dashboard.invoice.root,
      //     //   icon: ICONS.invoice,
      //     //   children: [
      //     //     { title: t('list'), path: paths.dashboard.invoice.root },
      //     //     {
      //     //       title: t('details'),
      //     //       path: paths.dashboard.invoice.demo.details,
      //     //     },
      //     //     { title: t('create'), path: paths.dashboard.invoice.new },
      //     //     { title: t('edit'), path: paths.dashboard.invoice.demo.edit },
      //     //   ],
      //     // },

      //     // BLOG
      //     // {
      //     //   title: t('blog'),
      //     //   path: paths.dashboard.post.root,
      //     //   icon: ICONS.blog,
      //     //   children: [
      //     //     { title: t('list'), path: paths.dashboard.post.root },
      //     //     { title: t('details'), path: paths.dashboard.post.demo.details },
      //     //     { title: t('create'), path: paths.dashboard.post.new },
      //     //     { title: t('edit'), path: paths.dashboard.post.demo.edit },
      //     //   ],
      //     // },

      //     // JOB
      //     // {
      //     //   title: t('job'),
      //     //   path: paths.dashboard.job.root,
      //     //   icon: ICONS.job,
      //     //   children: [
      //     //     { title: t('list'), path: paths.dashboard.job.root },
      //     //     { title: t('details'), path: paths.dashboard.job.demo.details },
      //     //     { title: t('create'), path: paths.dashboard.job.new },
      //     //     { title: t('edit'), path: paths.dashboard.job.demo.edit },
      //     //   ],
      //     // },

      //     // TOUR
      //     // {
      //     //   title: t('tour'),
      //     //   path: paths.dashboard.tour.root,
      //     //   icon: ICONS.tour,
      //     //   children: [
      //     //     { title: t('list'), path: paths.dashboard.tour.root },
      //     //     { title: t('details'), path: paths.dashboard.tour.demo.details },
      //     //     { title: t('create'), path: paths.dashboard.tour.new },
      //     //     { title: t('edit'), path: paths.dashboard.tour.demo.edit },
      //     //   ],
      //     // },

      //     // FILE MANAGER
      //     // {
      //     //   title: t('file_manager'),
      //     //   path: paths.dashboard.fileManager,
      //     //   icon: ICONS.folder,
      //     // },

      //     // MAIL
      //     // {
      //     //   title: t('mail'),
      //     //   path: paths.dashboard.mail,
      //     //   icon: ICONS.mail,
      //     //   info: <Label color="error">+32</Label>,
      //     // },

      //     // CHAT
      //     // {
      //     //   title: t('chat'),
      //     //   path: paths.dashboard.chat,
      //     //   icon: ICONS.chat,
      //     // },

      //     // CALENDAR
      //     // {
      //     //   title: t('calendar'),
      //     //   path: paths.dashboard.calendar,
      //     //   icon: ICONS.calendar,
      //     // },

      //     // KANBAN
      //     // {
      //     //   title: t('kanban'),
      //     //   path: paths.dashboard.kanban,
      //     //   icon: ICONS.kanban,
      //     // },
      //   ],
      // },

      // DEMO MENU STATES
      // {
      //   subheader: t(t('other_cases')),
      //   items: [
      //     {
      //       // default roles : All roles can see this entry.
      //       // roles: ['user'] Only users can see this item.
      //       // roles: ['admin'] Only admin can see this item.
      //       // roles: ['admin', 'manager'] Only admin/manager can see this item.
      //       // Reference from 'src/guards/RoleBasedGuard'.
      //       title: t('item_by_roles'),
      //       path: paths.dashboard.permission,
      //       icon: ICONS.lock,
      //       roles: ['admin', 'manager'],
      //       caption: t('only_admin_can_see_this_item'),
      //     },
      //     {
      //       title: t('menu_level'),
      //       path: '#/dashboard/menu_level',
      //       icon: ICONS.menuItem,
      //       children: [
      //         {
      //           title: t('menu_level_1a'),
      //           path: '#/dashboard/menu_level/menu_level_1a',
      //         },
      //         {
      //           title: t('menu_level_1b'),
      //           path: '#/dashboard/menu_level/menu_level_1b',
      //           children: [
      //             {
      //               title: t('menu_level_2a'),
      //               path: '#/dashboard/menu_level/menu_level_1b/menu_level_2a',
      //             },
      //             {
      //               title: t('menu_level_2b'),
      //               path: '#/dashboard/menu_level/menu_level_1b/menu_level_2b',
      //               children: [
      //                 {
      //                   title: t('menu_level_3a'),
      //                   path: '#/dashboard/menu_level/menu_level_1b/menu_level_2b/menu_level_3a',
      //                 },
      //                 {
      //                   title: t('menu_level_3b'),
      //                   path: '#/dashboard/menu_level/menu_level_1b/menu_level_2b/menu_level_3b',
      //                 },
      //               ],
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //     {
      //       title: t('item_disabled'),
      //       path: '#disabled',
      //       icon: ICONS.disabled,
      //       disabled: true,
      //     },
      //     {
      //       title: t('item_label'),
      //       path: '#label',
      //       icon: ICONS.label,
      //       info: (
      //         <Label color="info" startIcon={<Iconify icon="solar:bell-bing-bold-duotone" />}>
      //           NEW
      //         </Label>
      //       ),
      //     },
      //     {
      //       title: t('item_caption'),
      //       path: '#caption',
      //       icon: ICONS.menuItem,
      //       caption:
      //         'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
      //     },
      //     {
      //       title: t('item_external_link'),
      //       path: 'https://www.google.com/',
      //       icon: ICONS.external,
      //     },
      //     {
      //       title: t('blank'),
      //       path: paths.dashboard.blank,
      //       icon: ICONS.blank,
      //     },
      //   ],
      // },
      // factory
      {
        subheader: 'Accounting',
        items: [
          {
            title: t('factory'),
            path: paths.dashboard.factory.factory,
            icon: ICONS.g_factory,
          },
          {
            title: t('vendor'),
            path: paths.dashboard.vendor.vendor,
            icon: ICONS.g_vendor,
            children: [
              { title: t('Vendor Details'), path: paths.dashboard.vendor.vendor },
              { title: t('Vendor Materials'), path: paths.dashboard.vendor.vendormaterials },
            ],
          },
          {
            title: t('purchase'),
            path: paths.dashboard.purchase.purchaseOrder,
            icon: ICONS.g_purchases,
            children: [
              { title: t('purchase Order'), path: paths.dashboard.purchase.purchaseOrder },
              { title: t('Purchase Invoice'), path: paths.dashboard.purchase.purchaseInvoice },
              { title: t('Purchase Payment'), path: paths.dashboard.purchase.purchasePayment },
            ],
          },
          {
            title: t('products'),
            path: paths.dashboard.products.products,
            icon: ICONS.g_products,
            children: [
              { title: t('Product Details'), path: paths.dashboard.products.products },
              { title: t('Customer'), path: paths.dashboard.products.customers },
            ],
          },
          {
            title: t('sales'),
            path: paths.dashboard.sale.salePayment,
            icon: ICONS.g_purchases,
            children: [
              { title: t('Sales Order'), path: paths.dashboard.sale.saleOrder },
              { title: t('Sales Invoice'), path: paths.dashboard.sale.saleInvoice },
              { title: t('Sales Payment'), path: paths.dashboard.sale.salePayment },
            ],
          },
          {
            title: t('Expenses'),
            path: paths.dashboard.expenses.expenses,
            icon: ICONS.g_expenses,
          },
          {
            title: t('assets'),
            path: paths.dashboard.assets.assets,
            icon: ICONS.g_assets,
          },
          {
            title: t('balancesheet'),
            path: paths.dashboard.balancesheet.balancesheet,
            icon: ICONS.g_balanceSheet,
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
