# Rà soát cuối sau khi bỏ DigiMart — 2026-11-03

## Phạm vi và kết quả

- 1.603 trang Markdown, 57 sidebar; DigiMart không còn trong source tài liệu, menu hoặc sitemap.
- Build production thành công trong khoảng 55 giây. Build hiện tự chạy checker trước/sau VitePress, kết quả 0 lỗi sidebar, asset và anchor.
- Quét 1.605 file HTML output bằng HTML parser: 0 target nội bộ bị thiếu, 0 anchor sai, 0 ID trùng. Con số HTML gồm cả 404 và trang API tĩnh.
- Lint 266 fenced PHP hoàn chỉnh bắt đầu bằng `<?php` (bỏ ví dụ có dấu `...`): không phát hiện lỗi cú pháp. Không thực thi code sample, không coi lint là kiểm chứng API/nghiệp vụ.
- Kiểm tra cú pháp Bash, diff whitespace và các kịch bản sync/deploy bằng fixture độc lập. Không SSH, upload hoặc deploy thật.

## Lỗi mới đã sửa

| Phát hiện | Sửa đổi / căn cứ |
| --- | --- |
| Overview hardcode `Current Version: 7.5.5` trong khi docs đã mô tả tính năng ở các phiên bản sau | Thay bằng hướng dẫn xem installed version và kiểm tra updater; không đoán latest release |
| Releases nói dashboard/composer.json cho biết latest stable | Phân biệt installed và available update; `about` có mục `Core Information → CMS Version`, được xác nhận trong `CommandServiceProvider.php` |
| Upgrade nói package luôn chứa `.env`, trái với trang Requirements; Troubleshooting coi default credentials là bằng chứng chắc chắn `.env` bị đè | Nêu current package dùng `.env.example`, bảo vệ `.env` với mọi archive; bổ sung khả năng thiếu file hoặc config cache cũ |
| Upgrade hardcode Cloudflare 100 giây | Bỏ con số cố định, dùng proxy timeout và giữ khuyến nghị CLI. [Cloudflare 524 docs](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-524/) hiện ghi default read timeout 125 giây; không nhầm read timeout với connection timeout |
| Link Edit dùng `master`, repo và deploy dùng `develop` | Đổi nhánh link edit sang `develop`; còn vấn đề mapping file sync ở mục dưới |
| Chẩn đoán license dùng IP Cloudflare cũ, tắt TLS verification, coi health-check 200 là bảo đảm activate được | Dùng hostname, giữ TLS verification, timeout hữu hạn, tách network/TLS/HTTP và license validity; sửa diagnostic PHP và lời giải thích |
| Hướng dẫn append iptables allow có thể không có tác dụng sau DROP | Giải thích thứ tự rule, bỏ lệnh append không xét vị trí |
| Backup command minh họa `name` như optional dù source khai báo required và có interactive prompt | Dùng ví dụ có tên backup rõ ràng, mô tả prompt khi thiếu |
| DeskHive/License Manager gọi Artisan trước khi bảo đảm có `vendor/` | Thêm bootstrap Composer khi thiếu vendor, bảo vệ `.env`/key; tách asset build tùy nhu cầu |
| Sync có thể xóa đích rồi mới phát hiện source thiếu, và phụ thuộc cwd người gọi | Fail-fast, chuyển cwd về repo root, kiểm tra toàn bộ nguồn trước khi ghi; copy trực tiếp, bỏ thao tác xóa trước copy và mục sync trùng |
| Build không chạy checker nên sidebar/asset/anchor có thể lọt | Tích hợp checker trước build và anchor checker sau build trong `docs:build`; cập nhật README |
| Deploy bỏ qua untracked files trong kiểm tra clean tree | Chặn cả file mới chưa commit trong đường deploy thông thường |
| Deploy chỉ in HTTP lỗi rồi exit 0 | Kiểm tra home, CMS, SaaS và logo với timeout; HTTP khác 200 trả exit 1, báo rõ release đã active và cách rollback thủ công |
| Cờ deploy viết sai vẫn có thể tiếp tục chạy | Kiểm tra số lượng và tên argument trước SSH |

## Kiểm chứng script

### Sync

Fixture trong thư mục tạm kiểm tra:

- Gọi script từ cwd ngoài repo vẫn dùng đúng source.
- Nội dung được copy đúng, chạy lại cho cùng kết quả.
- Không ghi đè sentinel của `ecommerce-saas`.
- Thiếu một source trả lỗi và không thay đổi bất kỳ destination nào.

Preflight không làm cả lượt sync thành transaction: lỗi I/O phát sinh giữa lượt vẫn có thể để một số file đã được copy. Khi đó script dừng và build không tiếp tục; chạy lại sau khi sửa nguyên nhân.

### Deploy

Fixture thay toàn bộ `ssh`, `rsync`, `git`, `npm`, `curl` bằng stub cục bộ:

- Flag không hợp lệ trả exit 2 trước kết nối.
- Untracked file khiến đường deploy thường bị chặn.
- Bốn health-check 200 trả thành công; HTTP 404 trả lỗi.

Chỉ kiểm tra logic cục bộ, chưa kiểm thử hạ tầng/SSH/rsync thật. Không tự rollback khi health-check lỗi để tránh đảo release do một lỗi mạng tạm thời.

## Các tối ưu và quyết định còn lại

1. **Edit link của trang được sync:** ví dụ `docs/shofy/installation-requirements.md` không được track trong Git, nguồn thật là `docs/cms/installation-requirements.md`. Đổi branch chưa giải quyết mapping này. Nên có một manifest dùng chung cho sync và edit links, tránh nhân đôi danh sách bằng tay.
2. **License staging:** cách diễn đạt vẫn cần thống nhất giữa môi trường phát triển không cần activate và staging public cần license riêng. Chưa tự thay chính sách thương mại.
3. **Rollback lặp lại:** script chọn release mới nhất khác current, không luôn là release có timestamp nhỏ hơn current. Sau khi đã rollback một lần, gọi lần nữa có thể quay về release mới hơn. Nên lưu previous release hoặc lọc đúng thứ tự khi cải tiến quy trình.
4. **`--no-build`:** cố ý bỏ qua clean-tree/build; chưa có metadata SHA/hash chứng minh dist khớp source. Nên tạo manifest build trước khi cho phép dùng đường này trong automation.
5. **Checker còn giới hạn:** checker trong repo dùng regex, chưa kiểm tra toàn bộ HTML, manifest, external links hoặc tính đúng của code sample. HTML parser và PHP lint của đợt audit là các kiểm tra bổ sung riêng, chưa đưa thành CI job.
6. **Tốc độ:** vẫn có screenshot nhiều MiB và search index 10,38 MiB chưa nén (gzip thử cục bộ khoảng 2,51 MiB, chưa xác nhận compression trên hosting). VitePress tải UI local search bằng async import; kích thước search index không đồng nghĩa mọi page load tải toàn bộ index. Cần đo Network/INP trên thiết bị thực trước khi quyết định chuyển search service. Ưu tiên nén ảnh lớn và tìm kiếm theo sản phẩm.
7. **Nội dung/SEO:** home còn thiên về marketing và có các con số rating/claim CI hardcode. Nên chuyển sang danh mục tài liệu, thay claim chưa có nguồn bằng hướng dẫn thực tế, thêm description theo trang. Không canonical hóa hàng loạt hoặc xóa trang duplicate khi chưa quyết định URL cần giữ.
8. **Nguồn metadata:** tiếp tục gom PHP/framework/product labels/version policy về một nguồn. Đợt này giữ yêu cầu PHP 8.3.36 và Laravel 13.x theo xác nhận của chủ sản phẩm, không sửa các repo CMS/product khác.

## Giới hạn kết luận

Không còn lỗi ở các kiểm tra cấu trúc vừa chạy. Chưa thể chứng nhận toàn bộ nội dung nghiệp vụ của 1.603 trang, mọi phiên bản sản phẩm hoặc mọi lệnh mẫu. Các đối chiếu source dùng snapshot local, không phải xác nhận version đang chạy trên server. Chưa đo Lighthouse/Core Web Vitals hoặc kiểm tra UI bằng trình duyệt thực.
