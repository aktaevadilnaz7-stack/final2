$(document).ready(function() {

    // ==========================================
    // OLD FEATURES (Maintained from Endterm)
    // ==========================================
    
    // Login Modal
    $('#openLogin').click(function() {
        $('#loginModal').fadeIn(400).css('display', 'flex');
    });

    $('.close-modal').click(function() {
        $('#loginModal').fadeOut(400);
        $('#passMatchError').hide();
        $('#loginPassConfirm').css('border', '1px solid #333');
    });

    $('#signInBtn').click(function() {
        const u = $('#loginUser').val().trim();
        const p = $('#loginPass').val().trim();
        const pc = $('#loginPassConfirm').val().trim();
        
        $('#passMatchError').hide();
        $('#loginPassConfirm').css('border', '1px solid #333');

        if(u === "" || p === "" || pc === "") {
            alert("All fields are required!");
            return;
        }

        if(p !== pc) {
            $('#passMatchError').fadeIn();
            $('#loginPassConfirm').css('border', '1px solid #ff4d8d');
        } else {
            $(this).text("Success!");
            setTimeout(() => { 
                $('#loginModal').fadeOut(); 
                $(this).text("Sign In"); 
                $('#loginUser, #loginPass, #loginPassConfirm').val("");
            }, 1000);
        }
    });

    // Gallery Filter
    $('.filter-btn').click(function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        const f = $(this).attr('data-filter');
        
        $('.gallery-item').fadeOut(300).promise().done(function() {
            if(f === 'all') {
                $('.gallery-item').fadeIn(400);
            } else {
                $('.gallery-item.' + f).fadeIn(400);
            }
        });
    });

    // Contact Form Validation
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        let valid = true;
        $('.error-text').hide();

        if($('#name').val().trim() === "") { 
            $('#nameError').show(); 
            valid = false; 
        }
        
        const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if(!$('#email').val().match(emailRegex)) { 
            $('#emailError').show(); 
            valid = false; 
        }

        if($('#message').val().trim().length < 10) { 
            $('#messageError').show(); 
            valid = false; 
        }

        if(valid) {
            $(this).fadeOut(400, function() {
                $('#successBox').fadeIn();
            });
        }
    });


    // ==========================================
    // NEW FINAL PROJECT FEATURES (CRUD & Table)
    // ==========================================
    
    // Initial Data Array (Mock Database)
    let albumData = [
        { artist: "Lady Gaga", album: "The Fame Monster", year: 2009, genre: "Pop/Electronic" },
        { artist: "Bruno Mars", album: "24K Magic", year: 2016, genre: "Funk/R&B" },
        { artist: "Selena Gomez", album: "Rare", year: 2020, genre: "Pop" },
        { artist: "Maksim", album: "Трудный возраст", year: 2006, genre: "Pop" }
    ];

    let currentSortDirection = true; // true = Ascending, false = Descending

    // READ: Function to display items dynamically
    function renderTable(dataToRender = albumData) {
        const $tableBody = $('#tableBody');
        $tableBody.empty(); // Clear existing content

        if (dataToRender.length === 0) {
            $tableBody.append(`<tr><td colspan="5" class="text-center text-muted">No records found.</td></tr>`);
            return;
        }

        dataToRender.forEach((item, originalIndex) => {
            // Find the true index in the master array
            const masterIndex = albumData.findIndex(x => x === item);

            const $row = $(`
                <tr style="display: none;" data-index="${masterIndex}">
                    <td>${item.artist}</td>
                    <td>${item.album}</td>
                    <td>${item.year}</td>
                    <td>${item.genre}</td>
                    <td>
                        <button class="btn-edit style-btn-action" data-index="${masterIndex}" style="background: transparent; color: #ff4d8d; border: 1px solid #ff4d8d; border-radius: 4px; padding: 3px 8px; cursor: pointer; margin-right: 5px;">Edit</button>
                        <button class="btn-delete style-btn-action" data-index="${masterIndex}" style="background: #ff4d8d; color: white; border: none; border-radius: 4px; padding: 3px 8px; cursor: pointer;">Delete</button>
                    </td>
                </tr>
            `);

            $tableBody.append($row);
            // Required jQuery transition (.slideDown)
            $row.slideDown(250);
        });
    }

    // Call render on load
    if($('#crudTable').length) {
        renderTable();
    }

    // Open Modal for CREATE
    $('#openAddModalBtn').click(function() {
        $('#crudForm')[0].reset();
        $('#entryIndex').val('');
        $('#modalTitle').text('Add New Album');
        $('#crudModal').fadeIn(300).css('display', 'flex');
        
        // Custom jQuery Animation decoration element (.animate method usage)
        $('.modal-content').css({transform: 'scale(0.7)'}).animate(
            { transform: 'scale(1)' },
            {
                step: function(now, fx) {
                    $(this).css('transform','scale('+now+')');
                },
                duration: 200
            }
        );
    });

    // Close Modal
    $('.close-crud-modal').click(function() {
        $('#crudModal').fadeOut(300);
    });

    // Handle Form submission (CREATE & UPDATE)
    $('#crudForm').on('submit', function(e) {
        e.preventDefault();

        const index = $('#entryIndex').val();
        const artist = $('#modalArtist').val().trim();
        const album = $('#modalAlbum').val().trim();
        const year = parseInt($('#modalYear').val().trim());
        const genre = $('#modalGenre').val().trim();

        // Form Validation Check
        if (!artist || !album || !year || !genre) {
            alert("Please fill in all table data inputs properly!");
            return;
        }

        const newObj = { artist, album, year, genre };

        if (index === '') {
            // CREATE operation
            albumData.push(newObj);
        } else {
            // UPDATE operation
            albumData[index] = newObj;
        }

        $('#crudModal').fadeOut(250);
        renderTable();
    });

    // Open Modal for UPDATE (using event delegation)
    $('#tableBody').on('click', '.btn-edit', function() {
        const index = $(this).attr('data-index');
        const currentData = albumData[index];

        $('#entryIndex').val(index);
        $('#modalArtist').val(currentData.artist);
        $('#modalAlbum').val(currentData.album);
        $('#modalYear').val(currentData.year);
        $('#modalGenre').val(currentData.genre);

        $('#modalTitle').text('Edit Album Data');
        $('#crudModal').fadeIn(300).css('display', 'flex');
    });

    // DELETE operation with animations and confirmation
    $('#tableBody').on('click', '.btn-delete', function() {
        const index = $(this).attr('data-index');
        const targetRow = $(this).closest('tr');

        // Required Confirmation check
        if (confirm(`Are you sure you want to delete "${albumData[index].album}"?`)) {
            // Required jQuery fadeOut transition
            targetRow.fadeOut(400, function() {
                albumData.splice(index, 1);
                renderTable();
            });
        }
    });

    // SEARCH & FILTER SYSTEM
    $('#tableSearch').on('input', function() {
        const value = $(this).val().toLowerCase();
        const filteredData = albumData.filter(item => {
            return item.artist.toLowerCase().includes(value) || 
                   item.album.toLowerCase().includes(value) || 
                   item.genre.toLowerCase().includes(value) ||
                   item.year.toString().includes(value);
        });
        renderTable(filteredData);
    });

    // SORTING implementation (Ascending / Descending toggles)
    function sortTableByField(field, isNumeric = false) {
        currentSortDirection = !currentSortDirection;
        albumData.sort((a, b) => {
            let valA = isNumeric ? a[field] : a[field].toLowerCase();
            let valB = isNumeric ? b[field] : b[field].toLowerCase();

            if (valA < valB) return currentSortDirection ? -1 : 1;
            if (valA > valB) return currentSortDirection ? 1 : -1;
            return 0;
        });
        renderTable();
    }

    $('#sortByArtist').click(() => sortTableByField('artist'));
    $('#sortByAlbum').click(() => sortTableByField('album'));
    $('#sortByYear').click(() => sortTableByField('year', true));
    $('#sortByGenre').click(() => sortTableByField('genre'));
});