# Audit docs.botble.com — 2026-11-03

Các số liệu và phát hiện dưới đây ghi lại từng đợt audit. Sau khi bỏ DigiMart và sửa thêm pipeline/nội dung, xem trạng thái hiện tại ở [Rà soát cuối](2026-11-03-final-review.md).

## Phạm vi

Rà cấu hình VitePress, theme, script sync/deploy, Markdown, ảnh và output build. Không deploy và chưa đo Core Web Vitals trên trình duyệt thực tế.

## Đã sửa trong đợt audit

- `docs/.vitepress/config.ts`: logo dùng `/logo.png` thay cho `logo.png`, thêm alt. HTML cũ ở `/cms/` chứa `src="logo.png"`, khiến trình duyệt resolve thành `/cms/logo.png`. Điều này giải thích khác biệt giữa truy cập trực tiếp trang con và điều hướng từ trang chủ.
- Thống nhất yêu cầu PHP tối thiểu thành `8.3.36` trong tài liệu cài đặt, giới thiệu, FAQ và hướng dẫn liên quan. Sửa nguồn CMS rồi đồng bộ các theme. Giữ tên service/socket `php8.3-fpm`, các mô tả tính năng ngôn ngữ và ví dụ compatibility của sản phẩm bên thứ ba.
- `docs/cms/index.md`: Laravel Framework `12.x` → `13.x`.

## Các tối ưu nên làm tiếp, theo ưu tiên

| Ưu tiên | Phát hiện và bằng chứng | Đề xuất |
| --- | --- | --- |
| Cao | `bin/deploy.sh` chỉ build, chưa gọi checker sidebar/assets/anchors. Kiểm tra HTTP cuối script chỉ in status, không làm deploy thất bại khi status lỗi. | Gate bằng checker trước upload; kiểm tra trang chủ, CMS, một theme và logo sau deploy; trả lỗi rõ ràng và có quy trình rollback. |
| Cao | 1.517 ảnh raster, tổng khoảng 363 MiB trong nguồn; một số PNG khoảng 4 MiB. Đây là tổng tài sản, không phải dung lượng tải mỗi trang. | Ưu tiên nén/resize screenshot lớn và tạo WebP; giữ độ rõ chữ, cập nhật reference. Đo dung lượng tải thực tế trước/sau. |
| Cao | Search index output khoảng 10 MiB chưa nén; 684 bản Markdown trùng byte ngoài bản đầu tiên. Search hiện cấu hình global local search. | Đo độ trễ mở search; ưu tiên lọc theo sản phẩm và xử lý kết quả trùng; cân nhắc search được host riêng nếu đo thực tế cho thấy local index quá nặng. |
| Trung bình | `.gitignore` bỏ qua các basename dùng chung trong mọi thư mục sản phẩm, rồi re-include từng ngoại lệ. `bin/shell_cmd.sh` dùng danh sách sản phẩm riêng, copy đè file và thiếu fail-fast. | Khai báo một manifest sản phẩm/nguồn dùng chung; kiểm tra source trước khi ghi; fail-fast; tránh khoảng trống file do xóa rồi copy. Thêm kiểm tra file mới bị ignore ngoài ý muốn. |
| Trung bình | Chỉ 196/1.622 trang khai báo `description:`. Cấu hình chưa sinh canonical hoặc Open Graph theo trang; nhiều trang chung bị nhân bản. | Thêm metadata theo sản phẩm/trang; xác định canonical cho nội dung thực sự trùng, giữ trang có hướng dẫn riêng; kiểm tra sitemap tương ứng. |
| Trung bình | Home là nội dung marketing, CTA chính chỉ dẫn CMS. Dropdown Documentation chứa 58 sản phẩm. | Chuyển home thành danh mục tài liệu có tìm sản phẩm, nhóm theme/plugin/mobile và lối tắt Install / Upgrade / Troubleshooting. |
| Thấp | `docs/public/favicon/manifest.json` dùng tên `App` và icon `/android-icon-*.png`, trong khi file nằm ở `/favicon/`. | Đổi tên ứng dụng và đường dẫn icon; checker hiện chưa bao phủ manifest. |

## Kiểm tra

- Checker sidebar, namespace và ảnh: 0 lỗi trên 1.622 trang, 58 sidebars.
- Build production thành công trong khoảng 55 giây; còn cảnh báo chunk lớn. HTML trang chủ, CMS và Shofy đều xuất logo `/logo.png`; trang CMS chứa PHP `8.3.36` và Laravel Framework `13.x`.
- Checker anchor ban đầu phát hiện 1 lỗi có sẵn ở `sms-gateways/changelog.md`; đã sửa link cho khớp ID thực có dấu `—`.
- Chưa thay đổi hosting/cache/CDN; chưa có bằng chứng để kết luận tốc độ thực tế hoặc mức cải thiện.

## Rà soát sâu lần hai

Đã đối chiếu các phần được sửa với mã nguồn local tại `../cms`, `../core`, `../dev-tool` và `../digimart`. Đây là snapshot workspace, không phải xác nhận tất cả bản phát hành khách hàng đang dùng. Không chạy cài đặt CMS, seed, Docker hay migration; chỉ đọc mã nguồn và build tài liệu.

### Lỗi đã sửa thêm

| Vấn đề | Bằng chứng | Thay đổi |
| --- | --- | --- |
| `cms:install` được mô tả như migration thông thường | `../core/platform/core/base/src/Commands/InstallCommand.php` gọi `migrate:fresh` | Cảnh báo xóa bảng ở trang Commands và Overview; chỉ dùng cho cài mới |
| Overview dùng quy trình `composer create-project botble/cms` trong khi các hướng dẫn chính bắt đầu từ gói nguồn đã mua | Composer root local tên `laravel/laravel`; chưa xác minh được một package public `botble/cms` tương ứng | Thống nhất Overview với quy trình extract gói nguồn; không khẳng định package public không tồn tại |
| CLI yêu cầu mở `.env` nhưng Requirements nói gói tải về không có `.env` | Mâu thuẫn ngay trong docs | Thêm bước tạo file khi thiếu, tạo key nếu trống và giữ key khi nâng cấp |
| Rebuild Docker dùng `down -v` | [Docker docs](https://docs.docker.com/reference/cli/docker/compose/down/) xác nhận `-v` xóa named/anonymous volumes | Dùng `sail down`, build rồi up, giữ database volumes |
| Docker thiếu bước kiểm tra PHP runtime | `../cms/docker-compose.yml` còn trỏ tới `runtimes/8.2`, image `sail-8.2/app` | Thêm ví dụ runtime PHP 8.4 và kiểm tra `php -v`, `composer check-platform-reqs`; không sửa repo CMS ngoài phạm vi |
| Hướng dẫn theme còn Mix, `mix()` và `npm run watch` | Root `package.json`, `vite-build.mjs`, descriptor Ripple xác nhận Vite và không có watch script | Đổi sang descriptor, build từ project root; cập nhật sơ đồ theme/child theme |
| Node.js 16+ trong requirements DigiMart quá cũ | `../digimart/package.json` dùng Vite 8; Vite 8 được cài trong CMS yêu cầu `^20.19.0 || >=22.12.0` | Cập nhật yêu cầu build và hướng dẫn Vite; giữ nguyên changelog lịch sử Node 16 |
| Requirements CMS thiếu GD, Overview thiếu cURL | `../cms/composer.json` yêu cầu cả `ext-gd` và `ext-curl` | Bổ sung tương ứng; sync Requirements ra theme |
| Ví dụ WebP ghép `.webp` vào URL có sẵn | `RvMedia.php` thay extension khi convert chứ không nối vào URL | Dùng URL media trả về; hướng dẫn bật convert cho upload mới |
| Ví dụ cache HTML cả trang dùng key chung `home-page` | Key không phân biệt user, locale, currency | Thay bằng hướng dẫn Page Cache chính thức của CMS và các điều kiện loại trừ |
| Khuyến nghị đổi tạm PHP về 8.1 để reload FPM | Không tương thích minimum PHP đã được xác nhận | Yêu cầu restart FPM và giữ PHP >= 8.3.36 |
| FID và lời hứa FAQ rich results đã cũ | [Web Vitals](https://web.dev/articles/vitals); [Google Search updates](https://developers.google.com/search/updates#may-2026) | Đổi FID sang INP; bỏ lời hứa FAQ rich results (Google ngừng hiển thị từ 07/05/2026) |
| Generator commands không phải luôn có trên production | Các lệnh create/remove nằm trong `botble/dev-tool` | Nêu rõ cần dev dependency và kiểm tra `artisan list` |
| KYC liệt kê PostgreSQL nhưng CMS không hỗ trợ chính thức | Đối chiếu `kyc/requirements.md` và `cms/database-support.md` | Phân biệt tương thích plugin và hỗ trợ toàn bộ CMS |
| Manifest/browserconfig trỏ sai icon | Các file thực ở `docs/public/favicon/` | Sửa prefix `/favicon/`, tên app và kiểm tra toàn bộ target tồn tại |

### Các điểm còn cần xác nhận hoặc tối ưu

- **License/staging:** `cms/license.md` vừa nói staging phát triển được dùng không kích hoạt, vừa nói mọi staging public đều cần license riêng. Cần làm rõ ranh giới development-only và website phục vụ người dùng thực; chưa tự sửa chính sách thương mại.
- **Chẩn đoán license:** có IP Cloudflare cố định và kết luận timeout là firewall block. DNS, routing, proxy hoặc server đích cũng có thể gây lỗi; nên dùng hostname/DNS hiện tại và quy trình chẩn đoán nhiều nguyên nhân. Chưa thay script chẩn đoán trong đợt này.
- **Metadata phiên bản:** `Current Version: 7.5.5` vẫn hardcode ở Overview. Chưa có nguồn release được xác nhận để thay; nên có nguồn metadata chung cho version/framework/PHP thay vì cập nhật lặp nhiều trang.
- **Ví dụ cache fragment/API:** vẫn là ví dụ tối giản, cần rà theo dữ liệu public/private, locale, currency, tenant và chiến lược invalidation trước khi áp dụng lên site cụ thể.
- **Kiểm tra tự động:** build hiện chưa gate bằng checker; checker regex chưa bao phủ manifest, toàn bộ link HTML, external URLs hay tính đúng của lệnh mẫu. Các kiểm tra filesystem icon trong đợt này được chạy riêng.
- **UX/performance:** ưu tiên search theo sản phẩm, ảnh lớn, metadata và home dạng danh mục như bảng ưu tiên phía trên. Không đổi canonical hoặc bỏ trang trùng hàng loạt khi chưa xác định URL cần giữ.

### Giới hạn

Kiểm tra cấu trúc áp dụng toàn bộ 1.622 trang và 58 sidebars; kiểm chứng ngữ nghĩa tập trung vào cài đặt, Commands, theme/assets, media/performance và các mâu thuẫn liên quan. Chưa thể kết luận mọi câu hoặc mọi code sample trong 1.622 trang đều chính xác. Chưa kiểm tra giao diện bằng trình duyệt và chưa deploy.

### Kết quả kiểm tra cuối

- `npm run docs:build`: thành công, khoảng 50,5 giây; còn cảnh báo chunk lớn.
- `node bin/check-docs-links.mjs --anchors`: 0 lỗi sidebar, cross-product, asset hoặc anchor trên 1.622 trang / 58 sidebars.
- `git diff --check`: thành công.
- Đã kiểm tra HTML build chứa cảnh báo `migrate:fresh`, hướng dẫn Vite, PHP `8.3.36` và runtime Sail mới; tất cả icon manifest/browserconfig đều có file tương ứng.
